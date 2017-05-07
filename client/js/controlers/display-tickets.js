import * as templates from 'templates';
import * as data from 'data';

function displayTickets(params, query) {
    let page = params.page || 1;
    if (!!query) {
        const queryParams = data.splitQueryParameters(query);
        page = queryParams['page'] || 1;
    }
    Promise.all([
            templates.get('main'),
            data.getTicketsRange(page),
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
            $('.plus').on('click', changeGliph);
            $('.sort').on('click', changeSort);
            addLinksToPagination(numberOfPages.result, numberOfPages.maxTicketsPerPage, page);
        });
}

function addLinksToPagination(numberOfTickets, ticketsPerPage, currentPage) {
    let numberOfPages = Math.ceil(numberOfTickets / ticketsPerPage);
    console.log(numberOfPages);
    console.log(currentPage);
    if (+currentPage > 1) {
        $('.previous').attr('href', '#tickets/' + (+currentPage - 1));
    } else {
        $('.previous').attr('href', '#tickets/' + 1);
    }
    if (+currentPage < +numberOfPages) {
        $('.next').attr('href', '#tickets/' + (+currentPage + 1));
    } else {
        $('.next').attr('href', '#tickets/' + (+currentPage));
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

function changeSort() {
    let $this = $(this).children('.sorted');
    if ($this.hasClass('glyphicon glyphicon-sort-by-attributes')) {
        $('.sort').children('.sorted')
            .removeClass('glyphicon glyphicon-sort-by-attributes')
            .removeClass('glyphicon glyphicon-sort-by-attributes-alt');
        $this.removeClass('glyphicon glyphicon-sort-by-attributes');
        $this.addClass('glyphicon glyphicon-sort-by-attributes-alt');
    } else if ($this.hasClass('glyphicon glyphicon-sort-by-attributes-alt')) {
        $('.sort').children('.sorted')
            .removeClass('glyphicon glyphicon-sort-by-attributes')
            .removeClass('glyphicon glyphicon-sort-by-attributes-alt');

        $this.removeClass('glyphicon glyphicon-sort-by-attributes-alt');
    } else {
        $('.sort').children('.sorted')
            .removeClass('glyphicon glyphicon-sort-by-attributes')
            .removeClass('glyphicon glyphicon-sort-by-attributes-alt');
        $this.addClass('glyphicon glyphicon-sort-by-attributes');
    }
}

export {
    displayTickets
};