module.exports = {
    getConvo: (req,res) => {
        req.app.get("db").messages.get_message_thread(req.params.id).then(response => {
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
    }
}