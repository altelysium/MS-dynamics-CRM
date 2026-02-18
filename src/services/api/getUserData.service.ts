import axios from "axios";
import type { User } from "../../types/userTypes";

export default async function getUserData(id: number | string): Promise<User> {
  const apiBaseUrl: string = import.meta.env["VITE_BASE_API_URL"];
  const response = await axios.get<User>(`${apiBaseUrl}users/${id}`);
  const data: User = await response.data;
  return data;
}
