import * as templates from 'templates';
import * as db from 'data';


let tableObjObj = {
    ticket: [{
        id: 1,
        user: "Joe Dow",
        date: "12/12/2016",
        status: ["unresolved"],
        shortDescription: "Bad work",
        engineer: "EdEddy",
        user: "XXX",
        urgency: "mid",
        status: "new",
        longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dictum, ante eget maximus lobortis, massa diam pharetra lectus, eu auctor neque justo ac risus. Phasellus ac dignissim neque, ultricies elementum quam. In nec diam non dui laoreet vulputate sit amet sit amet quam. Curabitur accumsan pharetra arcu non pharetra.'

    }, {
        id: 3,
        user: "Joe Dow",
        date: "12/12/2016",
        status: ["unresolved"],
        shortDescription: "Bad work",
        engineer: "EdEddy",
        user: "XXX",
        urgency: "mid",
        status: "new",
        longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dictum, ante eget maximus lobortis, massa diam pharetra lectus, eu auctor neque justo ac risus. Phasellus ac dignissim neque, ultricies elementum quam. In nec diam non dui laoreet vulputate sit amet sit amet quam. Curabitur accumsan pharetra arcu non pharetra.'

    }, {
        id: 2,
        user: "Joe Dow",
        date: "12/12/2016",
        status: ["unresolved"],
        shortDescription: "Bad work",
        engineer: "EdEddy",
        user: "XXX",
        urgency: "mid",
        status: "new",
        longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dictum, ante eget maximus lobortis, massa diam pharetra lectus, eu auctor neque justo ac risus. Phasellus ac dignissim neque, ultricies elementum quam. In nec diam non dui laoreet vulputate sit amet sit amet quam. Curabitur accumsan pharetra arcu non pharetra.'

    }, ]
};


function display_Tickets(current_Page_Index) {
    let tickets_Range = tableObjObj;
    Promise.all([templates.get('main')])
        .then(([mainTemplate]) => {
            $('#main-content').html(mainTemplate(tickets_Range));
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
    display_Tickets
};

