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

function displayTickets() {
    templates.get('main')
        .then(function (template) {
            $('#main-content').html(template(tableObj))
        }).then(() => {
            $('.plus').on('click', changeGliph())
        });
    console.log($('.plus'));
    $('.plus').on('click', changeGliph);
    $('.id').each(addLink);

}

function addLink(index) {
    $this = $(this);
    let addressObj = {
        address: '#ticket' + $this.text(),
        idText: $this.text()
    }
    this.innerHTML = (Handlebars.compile(genLink)(addressObj));

}

function changeGliph() {
    console.log(row)
    $this = $(this);
    if ($this.hasClass('glyphicon-plus')) {
        $this.removeClass('glyphicon-plus');
        $this.addClass('glyphicon-minus');
    } else {
        $this.removeClass('glyphicon-minus');
        $this.addClass('glyphicon-plus');
    }
}
export {
    displayTickets
};