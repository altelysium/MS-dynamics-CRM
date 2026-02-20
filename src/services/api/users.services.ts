import type { User, UsersResponseData } from "../../types/userTypes";
import { api } from "./api";

export async function getUsers(
  queryParams: URLSearchParams,
  endpoint: string,
): Promise<UsersResponseData> {
  const { data } = await api.get<UsersResponseData>(`${endpoint}`, {
    params: queryParams,
  });
  return data;
}

export async function getUserData(id: number | string): Promise<User> {
  const { data } = await api.get<User>(`users/${id}`);
  return data;
}