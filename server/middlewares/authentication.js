const dummyUsersList = ["user0", "user1", "user2"];

module.exports = function () {
    return (req, res, next) => {
        console.log("auth...");
        return next();
        // try {
        //     if (dummyUsersList.includes(req.body.username)) {
        //         console.log("Found user", req.body.username);
        //         next();
        //     }
        // } catch {
        //     res.status(401).json({
        //         error: new Error("Invalid request!"),
        //     });
        // }
    };
};
