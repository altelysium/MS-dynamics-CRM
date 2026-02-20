import type { LoggedUser } from "../../types/authTypes";
import { api } from "./api";

export async function getTokens(username: string, password: string): Promise<LoggedUser> {
  const { data } = await api.post<LoggedUser>(`auth/login`, {
    username: username,
    password: password,
    expiresInMins: 120,
  });
  return data;
}
