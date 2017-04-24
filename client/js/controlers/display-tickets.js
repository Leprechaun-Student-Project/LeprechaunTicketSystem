import * as templates from 'templates';
import * as data from 'data';

let tableObj = {
    ticket: [{
        id: [5012],
        worker: ["Joe Dow"],
        startDate: ["12/12/2016"],
        status: ["unresolved"],
        description: [
            "Bad work", `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dictum, ante eget maximus lobortis, massa diam pharetra lectus, eu auctor neque justo ac risus. Phasellus ac dignissim neque, ultricies elementum quam. In nec diam non dui laoreet vulputate sit amet sit amet quam. Curabitur accumsan pharetra arcu non pharetra. `
        ]
    }, {
        id: [5032],
        worker: ["Joe Dow"],
        startDate: ["12/12/2016"],
        status: ["advice mode"],
        description: [
            "Bad work", `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dictum, ante eget maximus lobortis, massa diam pharetra lectus, eu auctor neque justo ac risus. Phasellus ac dignissim neque, ultricies elementum quam. In nec diam non dui laoreet vulputate sit amet sit amet quam. Curabitur accumsan pharetra arcu non pharetra. `
        ]
    }, {
        id: [21012],
        worker: ["Joe Dow"],
        startDate: ["12/12/2016"],
        status: ["in progress"],
        description: [
            "Bad work", `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dictum, ante eget maximus lobortis, massa diam pharetra lectus, eu auctor neque justo ac risus. Phasellus ac dignissim neque, ultricies elementum quam. In nec diam non dui laoreet vulputate sit amet sit amet quam. Curabitur accumsan pharetra arcu non pharetra. `
        ]
    }, {
        id: [6512],
        worker: ["Joe Dow"],
        startDate: ["12/12/2016"],
        status: ["unresolved"],
        description: [
            "Bad work", `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dictum, ante eget maximus lobortis, massa diam pharetra lectus, eu auctor neque justo ac risus. Phasellus ac dignissim neque, ultricies elementum quam. In nec diam non dui laoreet vulputate sit amet sit amet quam. Curabitur accumsan pharetra arcu non pharetra. `
        ]
    }, {
        id: [7612],
        worker: ["Joe Dow"],
        startDate: ["12/12/2016"],
        status: ["unresolved"],
        description: [
            "Bad work", `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dictum, ante eget maximus lobortis, massa diam pharetra lectus, eu auctor neque justo ac risus. Phasellus ac dignissim neque, ultricies elementum quam. In nec diam non dui laoreet vulputate sit amet sit amet quam. Curabitur accumsan pharetra arcu non pharetra. `
        ]
    }, ]
};

function displayNavBar() {
    console.log('yes')
    let navBar = templates.get('navBar')
        .then(function (template) {
            console.log(template)
            $('#header-container').html(template())
        });
}

function displayTickets() {
    let main = templates.get('main')
        .then(function (template) {
            $('#main-content').html(template(tableObj))
        });
    Promise.all([main]).then(() => {
        $('.plus').on('click', changeGliph);
        $('.id').each(addLink);

    });

}

function displayPagination() {
    let paginationSize = {
        page: ["1", "2", "..", "7", "8"]
    };
    let pagination = templates.get('pagination')
        .then(function (template) {
            $('#footer-container').html(template(paginationSize))
        });
}

function addLink(index) {
    let $this = $(this);
    let trimmedID = $this.text().trim();
    let addressObj = {
        address: '#ticket' + trimmedID,
        idText: trimmedID
    }
    //TODO Export template
    let template = '<a href="{{address}}">{{idText}}</a>';
    this.innerHTML = (Handlebars.compile(template)(addressObj));
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

export {
    displayTickets,
    displayNavBar,
    displayPagination
};