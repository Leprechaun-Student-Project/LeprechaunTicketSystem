import * as templates from 'templates';
import * as data from 'data';

function displayForm() {

    let newTicket = templates.get('newTicket')
        .then(function (template) {
            let currentDate = new Date().toString().split(' ');
            currentDate = currentDate[1] + " " + currentDate[2] + " " + currentDate[3] + " " + currentDate[4];
            $('#main-content').html(template({
                date: currentDate,
                name: ["me", "you", "someone else"]
            }))
        })
    Promise.all([newTicket])
        .then(() => {
            $('#sendNewTicket').on('click', submitForm);
        })
}

function submitForm() {
   // console.log($('#shortDecription'));
    let newTicket={
        user:$('#userName').text(),
        shortDescription:$('#shortDescription').val(),
        longDescription:$('#lognDescription').val(),
        date:new Date(),


    }
    console.log(newTicket);
}

export {
    displayForm
}