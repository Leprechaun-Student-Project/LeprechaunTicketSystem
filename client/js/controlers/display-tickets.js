import * as templates_Generator from 'templates';   // './js/templates_Generator.js',
import * as db_Queryer from 'data';                 // './js/db_Queryer.js'

import * as numb_Reader from 'numb-reader';         // './node_modules/number-to-words/numberToWords.min.js'


const max_Number_Of_Neighbor_Pages = 3;
const number_Of_tickets_Per_Page = 8;

//let tableObj = {
//    ticket: [{
//        id: [5012],
//        worker: ["Joe Dow"],
//        startDate: ["12/12/2016"],
//        status: ["unresolved"],
//        description: [
//            "Bad work", `
//        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dictum, ante eget maximus lobortis, massa diam pharetra lectus, eu auctor neque justo ac risus. Phasellus ac dignissim neque, ultricies elementum quam. In nec diam non dui laoreet vulputate sit amet sit amet quam. Curabitur accumsan pharetra arcu non pharetra. `
//        ]
//    }, {
//        id: [5032],
//        worker: ["Joe Dow"],
//        startDate: ["12/12/2016"],
//        status: ["advice mode"],
//        description: [
//            "Bad work", `
//        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dictum, ante eget maximus lobortis, massa diam pharetra lectus, eu auctor neque justo ac risus. Phasellus ac dignissim neque, ultricies elementum quam. In nec diam non dui laoreet vulputate sit amet sit amet quam. Curabitur accumsan pharetra arcu non pharetra. `
//        ]
//    }, {
//        id: [21012],
//        worker: ["Joe Dow"],
//        startDate: ["12/12/2016"],
//        status: ["in progress"],
//        description: [
//            "Bad work", `
//        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dictum, ante eget maximus lobortis, massa diam pharetra lectus, eu auctor neque justo ac risus. Phasellus ac dignissim neque, ultricies elementum quam. In nec diam non dui laoreet vulputate sit amet sit amet quam. Curabitur accumsan pharetra arcu non pharetra. `
//        ]
//    }, {
//        id: [6512],
//        worker: ["Joe Dow"],
//        startDate: ["12/12/2016"],
//        status: ["unresolved"],
//        description: [
//            "Bad work", `
//        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dictum, ante eget maximus lobortis, massa diam pharetra lectus, eu auctor neque justo ac risus. Phasellus ac dignissim neque, ultricies elementum quam. In nec diam non dui laoreet vulputate sit amet sit amet quam. Curabitur accumsan pharetra arcu non pharetra. `
//        ]
//    }, {
//        id: [7612],
//        worker: ["Joe Dow"],
//        startDate: ["12/12/2016"],
//        status: ["unresolved"],
//        description: [
//            "Bad work", `
//        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dictum, ante eget maximus lobortis, massa diam pharetra lectus, eu auctor neque justo ac risus. Phasellus ac dignissim neque, ultricies elementum quam. In nec diam non dui laoreet vulputate sit amet sit amet quam. Curabitur accumsan pharetra arcu non pharetra. `
//        ]
//    }, ]
//};

// I could not find navBar.handlebars in templates folder

//function displayNavBar() {
//    let navBar = templates_Generator.get('navBar')
//        .then(function (template) {
//            $('#header-container').html(template())
//        });
//}

function display_Tickets(current_Page_Index) {

    // retrieve from db_Queryer base the right chunk/amount of tickets
    let tickets_Range = db_Queryer.get_Tickets_Range(current_Page_Index, number_Of_tickets_Per_Page);  

    let main = templates_Generator.get('main')
        .then(function (template) {
            $('#main-content').html(template(tickets_Range))
        });
    Promise.all([main]).then(() => {
        $('.plus').on('click', changeGliph);
        $('.id').each(add_Link);
    });
}

function display_Pagination(current_Page_Index) {

    // retrieve from db_Queryer base the right chunk/amount of tickets
    let number_Of_All_tickets = db_Queryer.get_Tickets_Numb();
    let last_Page_Index = Math.ceil(number_Of_All_tickets / number_Of_tickets_Per_Page);

    // draw the paniataro only if there is more than one pages to show
    if (last_Page_Index > 1) {

        let pagination_Content;

        if (last_Page_Index == 2) {
            // display special case of paginator with two coices
            if (current_Page_Index == 0) {
                pagination_Content = {
                    links: [add_Link_To_Paginator(1, '&laquo;'), null],
                    arias: ['first page', ''],
                };
            } else {
                pagination_Content = {
                    links: [null, add_Link_To_Paginator(2, '&raquo;')],
                    arias: ['', 'last page'],
                };
            }
        } else {
            // now a coomon logic can express the rest of the cases

            let bottom_Page_Index = (current_Page_Index - max_Number_Of_Neighbor_Pages) + 1;

            if (bottom_Page_Index <= 0) {
                bottom_Page_Index = 2;
            }

            // load default values to the paginator
            
            let links = [];
            let arias = [];
            
            links.push(add_Link_To_Paginator(1, '&laquo;'));
            arias.push('first');
            
            for (let i = 0, j = bottom_Page_Index; i < last_Page_Index + 1 + last_Page_Index; i++, j++) {
                links.push(add_Link_To_Paginator(j, j));
                arias.push(numb_Reader.toWordsOrdinal(21)); // converts numb 21 to "twenty first" for example
            }
            
            links.push(add_Link_To_Paginator(links.length + 1, '&raquo;'));
            arias.push('last');
            
            links[current_Page_Index] = null;

            pagination_Content = {
                links: links,
                arias: arias
            };
        }

        // get little small HTML(func) for the pagination
        let pagination = templates_Generator.get('pagination')
            .then(function (template) {
                $('#main-content').html(template(pagination_Content))
            });
    }
}

function add_Link(index) {
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

function add_Link_To_Paginator(index) {
    return '<a href=\"#list/' + index + '\">' + index + '</a>';
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
    display_Tickets,
    //displayNavBar,
    display_Pagination
};