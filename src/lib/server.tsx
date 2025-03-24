import { useSession } from "vinxi/http";
import { PlayerDB } from "./PlayerDB";
import bcrypt from "bcryptjs";

type SessionData = {
    userId?: string;
  }
  


export function validateUsername(username: unknown) {
  if (typeof username !== "string" || username.length < 3) {
    return `Usernames must be at least 3 characters long`;
  }
}

export function validatePassword(password: unknown) {
  if (typeof password !== "string" || password.length < 6) {
    return `Passwords must be at least 6 characters long`;
  }
}

export async function login(username: string, password: string) {
  const user = await PlayerDB.user.findUnique({ where: { username } });
  if (!user) throw new Error("Invalid login");
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid login");
  return user;
}

export async function logout() {
  const session = await getSession();
  await session.update(d => {
    return { userId: undefined };
  });
}

export async function register(username: string, password: string) {
  const existingUser = await PlayerDB.user.findUnique({ where: { username } });
  if (existingUser) throw new Error("User already exists");
  console.log(password)
  password = await bcrypt.hash(password, 10)
  console.log(password)

  return PlayerDB.user.create({
    data: { username: username, password }
  });
}

export function getSession() {
    'use server'
    return useSession<SessionData>({
      password: import.meta.env.VITE_SESSION_SECRET,
    })
  }