module.exports = function (db, transporter) {

    function get(req, res) {
        console.log('here1');
    }

    function post(req, res) {
        let ticket = req.body;
        let status = true;
       
        for (let keys in ticket) {
            if (ticket[keys].match(/([<>&])/gm)) {
                status = false;
                res.status(401)
                    .json("You can't use symbols like < > and & in field " + keys);
                return;
            } else if ((ticket[keys] === "" || ticket[keys] === undefined) && keys != "comment") {
                status = false;
                res.status(401)
                    .json("You can't have empty filed " + keys);
                return;
            }
        }
      if (ticket.engineer === 'select') {
            status = false;
            res.status(401)
                .json("Please select enigneer!");
            return;
        }
        if (ticket.urgency === 'Select Urgency') {
            status = false;
            res.status(401)
                .json("Please select urgency status!");
            return;
        }
        if (status) {
            db.collection('tickets').insert(ticket);
            sendEmail(ticket);
            res.status(201)
                .json({
                    result: {
                        status: 'success'
                    }
                });
        }
    }

    function put(req, res) {
        console.log('here3');
    }

    function sendEmail(ticket) {
        db.collection('users').findOne({
            usernameToLower: ticket.engineer.toLowerCase()
        }, function (e, dbUser) {
            if (dbUser) {
                const mailBody = `
                Short Description: ${ticket.shortDescription}
                Long Description: ${ticket.longDescription}
                Date: ${ticket.date}
                Urgency: ${ticket.urgency}
                                  `;
                let mailOptions = {
                    from: '"Leprechaun Team" <noreply@leprechaun.com>',
                    to: dbUser.email,
                    subject: 'new ticket created',
                    text: mailBody,
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message %s sent: %s', info.messageId, info.response);
                });
            }
        });
    }

    return {
        get: get,
        post: post,
        put: put
    };
};