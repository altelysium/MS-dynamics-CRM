import axios from "axios";
import type { UsersResponseData } from "../../types/userTypes";

export default async function getUsers(
  queryParams: URLSearchParams,
  endpoint: string,
): Promise<UsersResponseData> {
  const apiBaseUrl: string = import.meta.env["VITE_BASE_API_URL"];
  const response = await axios.get<UsersResponseData>(`${apiBaseUrl}${endpoint}`, {
    params: queryParams,
  });
  const data: UsersResponseData = await response.data;
  return data;
}
