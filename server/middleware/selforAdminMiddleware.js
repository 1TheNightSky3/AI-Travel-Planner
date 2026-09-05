const authorizeSelfOrAdmin = (req, res, next) => {

    // User information না থাকলে
    if (!req.user) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    const requestedUserId = Number(req.params.id);
    const loggedInUserId = Number(req.user.user_id);

    // Admin হলে যেকোনো user's data access করতে পারবে
    if (req.user.role === "admin") {
        return next();
    }

    // Normal user হলে শুধু নিজের data access করতে পারবে
    if (loggedInUserId === requestedUserId) {
        return next();
    }

    // অন্য user's data access করতে চাইলে
    return res.status(403).json({
        message: "Access denied. You can only access your own profile."
    });
};

module.exports = authorizeSelfOrAdmin;