import bcrypt from "bcryptjs";
import { User } from "../modules/users/user.model.js";

export const authenticateAdmin = async (email, password) => {
  if (!email || !password) return null;

  const user = await User.findOne({ email }).select("+password");
  if (!user) return null;

  if (user.role !== "ADMIN") return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  return { email: user.email, role: user.role };
};
