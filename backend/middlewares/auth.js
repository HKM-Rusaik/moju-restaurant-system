import jwt from "jsonwebtoken";

const jwtSecret = "your_jwt_secret";

const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "Token missing, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.customer = { customerId: decoded.customerId };
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default auth;
