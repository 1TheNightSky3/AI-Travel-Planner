const authorizeRoles = (...allowedRoles) => {

    return (req, res, next) => {

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }

        next();
    };
};


const authorizeSelfOrAdmin = (req, res, next) => {

    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Authentication required"
        });
    }

    const requestedUserId = Number(req.params.id);
    const loggedInUserId = Number(req.user.user_id);

    if (
        req.user.role !== "ADMIN" &&
        requestedUserId !== loggedInUserId
    ) {
        return res.status(403).json({
            success: false,
            message: "You can only access your own profile"
        });
    }

    next();
};


module.exports = {
    authorizeRoles,
    authorizeSelfOrAdmin
};