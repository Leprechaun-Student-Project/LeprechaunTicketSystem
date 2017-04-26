import * as templates from 'templates';
import * as data from 'data';

function displayForm() {

    let newTicket = templates.get('newTicket')
        .then(function (template) {
            let currentDate = new Date().toString().split(' ');
            currentDate = currentDate[1] + " " + currentDate[2] + " " + currentDate[3] + " " + currentDate[4];
            $('#main-content').html(template({
                date: currentDate,
                name: ["me", "you", "someone else"],
                urgency: ["low", "mid", "high"]
            }))
        })
    Promise.all([newTicket])
        .then(() => {
            $('#sendNewTicket').on('click', submitForm);
            $('.dropdown li').on('click', selectOption);
        })
}

function selectOption() {
    // console.log($('.dropdown-toggle').dropdown());
    let currentSelection = $(this).text();
    $(this).parent().prev().text(currentSelection);
}

function submitForm() {
    // console.log($('#shortDecription'));
    let newTicket = {
        user: $('#userName').text(),
        shortDescription: $('#shortDescription').val(),
        longDescription: $('#lognDescription').val(),
        date: new Date(),
        engneer: $('#engineer').text(),
        urgency: $('#urgency').text(),
        comment: $('#comment').val()
    }
    data.sendNewTicket(newTicket)
        .then(function (successObj) {
            toastr.success('Ticket successfully filed.');
        }, function (err) {
            toastr.error('Ticket not filed to database');
        })
    $('#main-content').text('');
    document.location.href = '#';
}


export {
    displayForm
}