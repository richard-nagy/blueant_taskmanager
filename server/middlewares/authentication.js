module.exports = function () {
    return (req, res, next) => {
        // try {
        console.log("auth file looks good");
        next();
        // } catch {
        //     res.status(401).json({
        //         error: new Error("Invalid request!"),
        //     });
        // }
    };
};
