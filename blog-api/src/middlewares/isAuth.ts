import { ApolloError } from "apollo-server-express";
import jwt from "jsonwebtoken";

export const isAuth = (req, res) => {
  let token;
  try {
    token = req.get("Authorization").split(" ")[1];
  } catch (err) {
    const error = new ApolloError("Not authenticated.", "401");
    error.statusCode = 401;
    res.status(401).json({ message: error.message });
    throw error;
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    const code = "500";
    const message = "internal server error";
    err.statusCode = 500;
    res.status(500).json({ message: "internal server error" });
    throw new ApolloError(message, code);
  }
  if (!decodedToken) {
    const error = new ApolloError("Not authenticated.", "401");
    res.status(401).json({ message: error.message });
    error.statusCode = 401;
    throw error;
  }
  return decodedToken.userId;
};

export default isAuth;
