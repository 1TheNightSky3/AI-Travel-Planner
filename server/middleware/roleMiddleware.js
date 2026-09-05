const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {

        // Check whether user information exists
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        // Check user's role
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Access denied. You do not have permission."
            });
        }

        next();
    };
};

module.exports = authorizeRole;