module.exports = {
    getUserInfo: (req,res) => {
        req.app.get("db").users.get_user_info([req.session.user.id]).then(response => {
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
    updateFamilyMemberPic: (req,res) => {
        req.app.get("db").users.update_family_picture([req.body.id, req.body.url]).then(res => {
            res.sendStatus(200);
        }).catch(err => {
            res.status(500).send(err);
            console.log(err);
        })
    }
}