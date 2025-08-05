import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: "Missing token" });

  const token = authHeader.split(" ")[1] || "";

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as any;
    req.user = { id: payload.userId };
    next();
  } catch {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
