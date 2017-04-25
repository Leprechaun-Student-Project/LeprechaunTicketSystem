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
        comment:$('#comment').val()
    }
    console.log(newTicket);
    document.location.href = '#';
    data.sendNewTicket(newTicket)
        .then(function(successObj){
                console.log('send new ticket')
        }, function(err){
            //TODO no idea what does it do
            toastr.error(err.responseJSON);
        })
}


export {
    displayForm
}