module.exports = {
    getPosts: (req,res) => {
        req.app.get("db").posts.get_all_posts().then(response => {
            res.status(200).send(response);
        }).catch(err => {
            res.status(500).send(err);
            console.log(err);
        })
    }
}