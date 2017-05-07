import * as templates from 'templates';
import * as data from 'data';

function displayTickets(params, query) {
    const page = 1;
    Promise.all([templates.get('main'), data.getTicketsRange(page)])
        .then(([mainTemplate, tickets]) => {
            $('#main-content').html(mainTemplate(tickets));
            $('.plus').on('click', changeGliph);
            $('.sort').on('click', changeSort);
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
        $this.removeClass('glyphicon glyphicon-sort-by-attributes');
        $this.addClass('glyphicon glyphicon-sort-by-attributes-alt');
    } else if ($this.hasClass('glyphicon glyphicon-sort-by-attributes-alt')) {
        $this.removeClass('glyphicon glyphicon-sort-by-attributes-alt');
    } else {
        $this.addClass('glyphicon glyphicon-sort-by-attributes');
    }
}

export {
    displayTickets
};
