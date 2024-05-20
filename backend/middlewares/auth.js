import jwt from "jsonwebtoken";

const jwtSecret = "your_jwt_secret";

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  console.log(token);
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
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
