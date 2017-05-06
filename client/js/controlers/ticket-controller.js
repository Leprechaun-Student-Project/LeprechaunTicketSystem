import * as templates from 'templates';
import * as data from 'data';

function displayCreateTicketForm() {

    Promise.all([templates.get('newTicket'), data.getUsers()])
        .then(([template, users]) => {
            let currentDate = new Date().toString().split(' ');
            currentDate = currentDate[1] + " " + currentDate[2] + " " + currentDate[3] + " " + currentDate[4];

            $('#main-content').html(template({
                owner: data.getLoggedInUser(),
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
   let newTicket = {
       //
        user: $('#userName').text(),
        shortDescription: $('#shortDescription').val(),
        longDescription: $('#lognDescription').val(),
        date: new Date(),
        engneer: $('#engineer').attr('data-user-id'),
        urgency: $('#urgency-text').text(),
        //comment: $('#comment').val()
    }
    console.log(newTicket);
    for(let keys in newTicket){
        console.log(keys);
        if(newTicket[keys].match(/([<>&])./gm)){
            console.log(newTicket[keys]);
             toastr.error("You can't use symbols <> and & in "+keys);
             return;
        }else if(newTicket[keys]===""||newTicket[keys]===undefined){
             toastr.error("You can't have empty filed  "+keys);
             return;
        }

    }
    /*
 for (let k in ticket) {
            console.log("key:" + k + " value:" + ticket[k]);
            if (ticket[k].match(/([<>&])./gm)) {
                status = false;
                res.status(401)
                    .json("You can't use symbols like < > and & in field "+k);
                return;
            }else if(ticket[k]===""||ticket[k]===undefined){
                status = false;
                res.status(401)
                    .json("You can't have empty filed "+k);
                return;
            }
        }
    */

    data.sendNewTicket(newTicket)
        .then(function(successObj) {
            toastr.success('Ticket successfully filed.');
        }, function(err) {
            toastr.error(err.responseJSON);
        })
    $('#main-content').text('');
    document.location.href = '#';
}


export {
    displayCreateTicketForm
}
