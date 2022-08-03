const dummyUsersList = ["user0", "user1", "user2"];

module.exports = function () {
    return (req, res, next) => {
        console.log("yoo");

        console.log(req.query);

        if (dummyUsersList.includes(req.query.username)) {
            console.log("user is good");
            return next();
        } else {
            console.log("shit");
            return res.status(400).send({
                message: "Wrong username",
            });
        }
    };
};
