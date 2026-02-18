import axios from "axios";
import type { LoggedUser } from "../../types/authTypes";

export async function getTokens(username: string, password: string): Promise<LoggedUser> {
  const apiBaseUrl: string = import.meta.env["VITE_BASE_API_URL"];
  const {data} = await axios.post<LoggedUser>(`${apiBaseUrl}auth/login`, {
    username: username,
    password: password,
    expiresInMins: 120,
  });
  return data;
}
