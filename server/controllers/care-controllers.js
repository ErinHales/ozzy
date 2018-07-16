module.exports = {
    getAddresses: (req,res) => {
        req.app.get("db").care_providers.get_all_addresses().then(response => {
            res.status(200).send(response);
        }).catch(err => {
            res.status(500).send(err);
            console.log(err);
        })
    }
}