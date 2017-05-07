import * as templates from 'templates';
import * as data from 'data';

function displayTickets(params, query) {
    let page = 1;
    if (!!query) {
        const queryParams = data.splitQueryParameters(query);
        page = queryParams['page'] || 1;
    }
    Promise.all([templates.get('main'), data.getTicketsRange(page), templates.get('pagination'),data.getTicketsCount()])
        .then(([mainTemplate, tickets, pagination,numberOfPages]) => {
            $('#main-content')
                .html(mainTemplate(tickets))
                .append(pagination({
                    page: ["1", "2", "..", "7", "8"]
                }));
            $('.plus').on('click', changeGliph);
            $('.sort').on('click', changeSort);
            console.log(numberOfPages.result);
        });
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