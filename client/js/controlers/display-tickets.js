import * as templates from 'templates';
import * as data from 'data';

let sortBy;
let sortOrder;

function displayTickets(params, query) {
    let queryParams = {};
    let page = 1;
    if (!!query) {
        queryParams = data.splitQueryParameters(query);
        page = queryParams['page'];
    }

    Promise.all([
            templates.get('main'),
            data.getTicketsRange(queryParams),
            templates.get('pagination'),
            data.getTicketsCount()
        ])
        .then(([mainTemplate, tickets, pagination, numberOfPages]) => {
            let paginationSize = calculatePaginations(numberOfPages.result, numberOfPages.maxTicketsPerPage);
            $('#main-content')
                .html(mainTemplate(tickets))
                .append(pagination({
                    page: paginationSize
                }));

            if (!!query) {
                const queryParams = data.splitQueryParameters(query);
                $('.sort').children('.sorted')
                    .removeClass('glyphicon glyphicon-sort-by-attributes')
                    .removeClass('glyphicon glyphicon-sort-by-attributes-alt');
                for (const key in queryParams) {
                    if (key !== 'page') {
                        if (queryParams[key] === '1') {
                            let temp = $(`[sortby=${key}]`);
                            $(`[sortby=${key}]`).addClass('glyphicon glyphicon-sort-by-attributes-alt');
                        } else {
                            $(`[sortby=${key}]`).addClass('glyphicon glyphicon-sort-by-attributes');
                        }
                    }
                }
            }

            $('.plus').on('click', changeGliph);
            $('.sort').on('click', changeSort);
            addLinksToPagination(numberOfPages.result, numberOfPages.maxTicketsPerPage, page);
        });
}

function addLinksToPagination(numberOfTickets, ticketsPerPage, currentPage) {
    let numberOfPages = Math.ceil(numberOfTickets / ticketsPerPage);
    if (+currentPage > 1) {
        $('.previous').attr('href', '#/tickets?page=' + (+currentPage - 1));
    } else {
        $('.previous').attr('href', '#/tickets?page=' + 1);
    }
    if (+currentPage < +numberOfPages) {
        $('.next').attr('href', '#/tickets?page=' + (+currentPage + 1));
    } else {
        $('.next').attr('href', '#/tickets?page=' + (+currentPage));
    }
}

function calculatePaginations(numberofTickets, ticketsPerPage) {
    numberofTickets = numberofTickets || 1;
    ticketsPerPage = ticketsPerPage || 1;
    let numberOfPages = Math.ceil(numberofTickets / ticketsPerPage);
    let result = [];
    if (numberOfPages < 5) {
        for (let i = 1; i <= numberOfPages; i += 1) {
            result.push(i);
        };
    } else {
        result = [1, 2, '..', numberOfPages - 1, numberOfPages];
    }
    return result;
}

function changeGliph() {
    let $this = $(this);
    if ($this.hasClass('glyphicon-plus')) {
        $this.removeClass('glyphicon-plus');
        $this.addClass('glyphicon-minus');
    } else {
        $this.removeClass('glyphicon-minus');
        $this.addClass('glyphicon-plus');
    }
}

function changeQuery(currentAddress, sortBy, sortOrder) {
    const currentRoute = currentAddress.split('?');
    let options = currentRoute[1].split('&');
    let splittedOptions = {};
    options.forEach(function (option, index) {
        let keys = option.split('=');
        splittedOptions[keys[0]] = keys[1];
    })
    splittedOptions[sortBy] = sortOrder;
    let newAddress = '';
    for (const key in splittedOptions) {
        if (splittedOptions[key] !== null) {
            const param = key + '=' + splittedOptions[key] + '&';
            newAddress += param;
        }
    }
    newAddress = currentRoute[0] + '?' + newAddress.substr(0, newAddress.length - 1);
    return newAddress;
}

function changeSort() {
    let $this = $(this).children('.sorted');
    let locationAddress = location.href;
    const sortBy = $this.attr('sortby');
    if ($this.hasClass('glyphicon glyphicon-sort-by-attributes-alt')) {
        location.href = changeQuery(locationAddress, sortBy, -1);
    } else if ($this.hasClass('glyphicon glyphicon-sort-by-attributes')) {
        location.href = changeQuery(locationAddress, sortBy, null);
    } else {
        location.href = changeQuery(locationAddress, sortBy, 1);
    }
}

export {
    displayTickets
};