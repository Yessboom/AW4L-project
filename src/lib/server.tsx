import { useSession } from "vinxi/http";
import { PlayerDB } from "./PlayerDB";
import bcrypt from "bcryptjs";

type SessionData = {
  userId?: string;
}

export function validateUsername(username: unknown): string | undefined {
  if (typeof username !== "string" || username.length < 3) {
    return `Usernames must be at least 3 characters long`;
  }
  return undefined;
}

export function validatePassword(password: unknown): string | undefined {
  if (typeof password !== "string" || password.length < 6) {
    return `Passwords must be at least 6 characters long`;
  }
  return undefined;
}

export async function login(username: string, password: string) {
  const user = await PlayerDB.user.findUnique({ where: { username } });
  if (!user) throw new Error("Invalid login");
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid login");
  
  const session = await getSession();
  await session.update((oldData) => {
    return { ...oldData, userId: user.id };
  });
  
  return user;
}

export async function logout() {
  const session = await getSession();
  await session.update((oldData) => {
    return { ...oldData, userId: undefined };
  });
}

export async function register(username: string, password: string) {
  const existingUser = await PlayerDB.user.findUnique({ where: { username } });
  if (existingUser) throw new Error("User already exists");
  
  const hashedPassword = await bcrypt.hash(password, 10);

  return PlayerDB.user.create({
    data: { username, password: hashedPassword }
  });
}

export async function getSession() {
  'use server';
  return useSession<SessionData>({
    password: process.env.VITE_SESSION_SECRET || '',
  });
}