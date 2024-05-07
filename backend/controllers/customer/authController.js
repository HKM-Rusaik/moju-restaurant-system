import authService from "../../services/authService";

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await authService.authenticate(username, password);
    if (user) {
      req.session.user = user; // Store user information in session
      res.status(200).json({ message: "Login successful", user });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Error logging out" });
    } else {
      res.clearCookie("session-id"); // Clear session cookie
      res.status(200).json({ message: "Logout successful" });
    }
  });
};
