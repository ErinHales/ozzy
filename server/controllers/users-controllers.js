module.exports = {
    getUserInfo: (req,res) => {
        req.app.get("db").users.get_user_info([req.session.user.id]).then(response => {
            res.status(200).send(response);
        }).catch(err => {
            res.status(500).send(err);
            console.log(err);
        })
    },
    getFamilyInfo: (req,res) => {
        req.app.get("db").users.get_family_info([req.session.user.id]).then(response => {
            res.status(200).send(response);
        }).catch(err => {
            res.status(500).send(err);
            console.log(err);
        })
    },
    updateUserInfo: (req,res) => {
        req.app.get("db").users.update_picture([req.session.user.id, req.body.picture]).then(() => {
            res.status(200);
        }).catch(err => {
            res.status(500).send(err);
            console.log(err);
        })
    },
    updateParentInfo: (req,res) => {
        req.app.get("db").users.update_parent_info([req.session.user.id,req.body.status,req.body.childCare, req.body.subscriptions]).then(() => {
            res.status(200);
        }).catch(err => {
            res.status(500).send(err);
            console.log(err);
        })
    },
    updateFamilyMember: (req,res) => {
        req.app.get("db").users.update_family([req.body.id, req.body.url, req.body.name, req.body.relationship]).then(res => {
            res.sendStatus(200);
        }).catch(err => {
            res.status(500).send(err);
            console.log(err);
        })
    },
    addFamilyMember: (req,res) => {
        req.app.get("db").users.insert_into_family([req.session.user.id, req.body.name, req.body.image, req.body.relationship]).then(response => {
            res.status(200);
        }).catch(err => {
            res.status(500).send(err);
            console.log(err);
        })
    },
    createParentInfo: (req,res) => {
        req.app.get("db").users.create_parent_info([req.session.user.id, req.body.status, req.body.childcare, req.body.newsfeed]).then(() => {
            res.status(200);
        }).catch(err => {
            res.status(500).send(err);
            console.log(err);
        })
    }
}