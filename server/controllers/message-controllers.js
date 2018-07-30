module.exports = {
    getConvo: (req,res) => {
        req.app.get("db").messages.get_message_thread([req.session.user.id, req.params.id]).then(response => {
            res.status(200).send(response);
        }).catch(err => {
            console.log(err);
            res.status(500).send(err);
        })
    },
    getMessages: (req,res) => {
        req.app.get("db").messages.get_all_messages(req.session.user.id).then(response => {
            res.status(200).send(response)
        }).catch(err => {
            console.log(err);
            res.status(500).send(err);
        })
    },
    newConvo: (req,res) => {
        req.app.get("db").messages.create_convo([req.session.user.id, req.body.id]).then(response => {
            res.status(200);
        }).catch(err => {
            console.log(err);
            res.status(500).send(err);
        })
    },
    newMessage: (req,res) => {
        // care_provider_id, date, message, user_id, messager
        let { care_provider_id, date, message } = req.body;
        req.app.get("db").messages.create_message([care_provider_id, date, message, req.session.user.id, "User"]).then(response => {
            res.status(200).send(response);
        }).catch(err => {
            console.log(err);
            res.status(500).send(err);
        })
    },
    getLastMessage: (req,res) => {
        req.app.get("db").messages.get_last_message([req.session.user.id, req.params.id]).then(response => {
            res.status(200).send(response);
        }).catch(err => {
            console.log(err);
            res.status(500).send(err);
        })
    }
}