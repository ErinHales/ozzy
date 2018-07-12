const imposterUser = {
    id: 3,
    sub: "facebook|2092209624324400",
    first_name: "Erin",
    last_name: "Hales",
    username: "erin-mcbride-me-lass@silverstar.com",
    picture: "	http://i67.tinypic.com/1o0upf.jpg"
}

module.exports = {
    bypassAuthInDevelopment: (req,res,next) => {
        if(process.env.NODE_ENV === "development" && !req.session.user) {
            req.session.user = imposterUser
            next();
        } else {
            next();
        }
    }
}