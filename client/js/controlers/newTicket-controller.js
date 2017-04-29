import * as templates from 'templates';
import * as data from 'data';

function displayForm() {

    Promise.all([templates.get('newTicket'), data.getUsers()])
        .then(([template, users]) => {
            let currentDate = new Date().toString().split(' ');
            currentDate = currentDate[1] + " " + currentDate[2] + " " + currentDate[3] + " " + currentDate[4];
            $('#main-content').html(template({
                date: currentDate,
                users: users.result,
                urgency: ["low", "mid", "high"]
            }));
            $('#sendNewTicket').on('click', submitForm);
            $('#select-engineer li a').on('click', selectOptionEngineer);
            $('#select-urgency li a').on('click', selectOptionUrgency);
        })
}

function selectOptionEngineer() {
    const currentSelection = $(this).text();
    const dataUserId = $(this).attr('data-user-id');

    $('#engineer').attr('data-user-id', dataUserId);
    $('#engineer-text').text(currentSelection);
}

function selectOptionUrgency() {
    const currentSelection = $(this).text();
    $('#urgency-text').text(currentSelection);
}

function submitForm() {
    // console.log($('#shortDecription'));
    let newTicket = {
        user: $('#userName').text(),
        shortDescription: $('#shortDescription').val(),
        longDescription: $('#lognDescription').val(),
        date: new Date(),
        engneer: $('#engineer').attr('data-user-id'),
        urgency: $('#urgency-text').text(),
        comment: $('#comment').val()
    }
    
    data.sendNewTicket(newTicket)
        .then(function(successObj) {
            toastr.success('Ticket successfully filed.');
        }, function(err) {
            toastr.error('Ticket not filed to database');
        })
    $('#main-content').text('');
    document.location.href = '#';
}


export {
    displayForm
}
