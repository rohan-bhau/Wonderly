import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import dbConnect from "./db";
import User from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET!;

export function signToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string };
  } catch {
    return null;
  }
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  const payload = verifyToken(token);
  if (!payload) return null;

  await dbConnect();
  const user = await User.findById(payload.userId).select("-password");
  return user;
}
