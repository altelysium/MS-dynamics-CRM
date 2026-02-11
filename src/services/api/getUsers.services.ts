import axios from "axios";
import type { ResponseData } from "../../types/userTypes";

export default async function getUsers(queryParams: URLSearchParams): Promise<ResponseData> {
  const apiBaseUrl: string = import.meta.env["VITE_BASE_API_URL"];
  const response = await axios.get<ResponseData>(`${apiBaseUrl}users`, {
    params: queryParams,
  });
  const data: ResponseData = response.data;
  return data;
}
