export const requireCustomerAuth = (req, res, next) => {
  if (req.session.user) {
    next(); // User authenticated, continue to next middleware
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
