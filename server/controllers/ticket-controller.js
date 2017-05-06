module.exports = function(db, transporter) {

    function get(req, res) {
        console.log('here');
        const user = req.user;
        if (!user) {
            res.status(400)
                .json('Invalid user');
            return;
        }
        const ticketID = req.headers['ticket'];
        if (!ticketID) {
            res.status(400)
                .json('Invalid ticket id');
            return;
        }
        db.collection('tickets').findOne({
            'id': ticketID
        }, function(e, ticket) {
            if (!ticket) {
                res.status(404)
                    .json('Ticket not found');
                return;
            }

            res.status(201)
                .json({
                    result: {
                        ticket
                    }
                });
        });
    }

    function post(req, res) {
        let ticket = req.body;
        let status = true;
        for (let k in ticket) {
            console.log("key:" + k + " value:" + ticket[k]);
            if (ticket[k].match(/([<>&])./gm)) {
                status = false;
                res.status(401)
                    .json("You can't use symbols like < > and & in field " + k);
                return;
            } else if (ticket[k] === "" || ticket[k] === undefined) {
                status = false;
                res.status(401)
                    .json("You can't have empty filed " + k);
                return;
            }
        }
        if (status) {
            console.log(ticket);
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
            usernameToLower: ticket.engneer.toLowerCase()
        }, function(e, dbUser) {
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
