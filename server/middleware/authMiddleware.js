const jwt = require("jsonwebtoken");
const { User, Role } = require("../models");

const authMiddleware = (allowedRoles = []) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
          .status(401)
          .json({ message: "Unauthorized: No token provided" });
      }

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET);

      const user = await User.findByPk(decoded.user_id, {
        include: Role,
      });

      if (!user) {
        return res
          .status(401)
          .json({ message: "Unauthorized: User not found" });
      }

      const userRole = user.Role?.name;

      if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: "Forbidden: Access denied" });
      }

      req.user = user;
      next();
    } catch (err) {
      console.error("Auth Middleware Error:", err);
      res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};

module.exports = authMiddleware;
