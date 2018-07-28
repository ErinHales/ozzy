module.exports = {
    getAddresses: (req, res) => {
        req.app.get("db").care_providers.get_all_addresses().then(response => {
            res.status(200).send(response);
        }).catch(err => {
            res.status(500).send(err);
            console.log(err);
        })
    },
    newAddress: (req, res) => {
        req.app.get("db").care_providers.insert_into_address([req.session.user.id, req.body.line1, req.body.line2, req.body.city, req.body.state, req.body.zip]).then(res => {
            res.status(200);
        }).catch(err => {
            res.status(500).send(err);
            console.log(err);
        })
    },
    newCareProvider: (req, res) => {
        req.app.get("db").care_providers.insert_into_careproviders([req.body.name, req.body.status, req.body.shortBio, req.body.longBio, req.body.image]).then(response => {
            res.status(200);
        }).catch(err => {
            res.status(500).send(err);
            console.log(err);
        })
    }
}