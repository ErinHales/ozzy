module.exports = {
    getPosts: (req,res) => {
        req.app.get("db").posts.get_all_posts().then(response => {
            res.status(200).send(response);
        }).catch(err => {
            res.status(500).send(err);
            console.log(err);
        })
    },
    getLikedPosts: (req,res) => {
        req.app.get("db").posts.get_liked_posts([req.session.user.id,req.params.postid]).then(response => {
            res.status(200).send(response);
        }).catch(err => {
            res.status(500).send(err);
            console.log(err);
        })
    },
    likePost: (req,res) => {
        req.app.get("db").posts.like_post([req.params.postid, req.body.liked]).then(response => {
            res.status(200).send(response);
        }).catch(err => {
            res.status(500).send(err);
            console.log(err);
        })
    },
    lovePost: (req,res) => {
        req.app.get("db").posts.love_post([req.params.postid, req.body.loved]).then(response => {
            res.status(200).send(response);
        }).catch(err => {
            res.status(500).send(err);
            console.log(err);
        })
    }
}