import axios from "axios";
import type { LoggedUser } from "../../types/authTypes";

export async function getTokens(username: string, password: string): Promise<LoggedUser> {
  const apiBaseUrl: string = import.meta.env["VITE_BASE_API_URL"];
  const response = await axios.post<LoggedUser>(`${apiBaseUrl}user/login`, {
    method: "POST",
    username: username,
    password: password,
    expiresInMins: 120,
  });
  const data: LoggedUser = response.data;
  return data;
}
