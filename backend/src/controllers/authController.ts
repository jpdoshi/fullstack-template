import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hash });

    res.json({
      data: user,
      success: true,
    });
  } catch (err) {
    res.status(500).json({ error: err, success: false });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.dataValues.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user.dataValues.id);
    const refreshToken = generateRefreshToken(user.dataValues.id);

    user.set({ refreshToken });
    await user.save();

    res.json({ data: { accessToken, refreshToken }, success: true });
  } catch (err) {
    res.status(500).json({ error: err?.toString(), success: false });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const { token } = req.body;

  if (!token) return res.sendStatus(401);

  try {
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as any;
    const user = await User.findByPk(payload.userId);

    if (!user || user.dataValues.refreshToken !== token)
      return res.sendStatus(403);

    const newAccessToken = generateAccessToken(user.dataValues.id);
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(403).json({ error: err?.toString(), success: false });
  }
};

export const logout = async (req: Request, res: Response) => {
  const { token } = req.body;
  const user = await User.findOne({ where: { refreshToken: token } });

  if (user) {
    user.set({ refreshToken: null });
    await user.save();
  }

  res.json({ success: true, message: "Logout success" });
};
