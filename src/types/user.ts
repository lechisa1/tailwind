export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  status: UserStatus;
  createdAt?: string;
  updatedAt?: string;
}

export type UserStatus = "Active" | "Inactive";

export interface UserFormData extends Omit<User, "id" | "createdAt" | "updatedAt"> {
  id?: number;
}

export interface UserCreateData extends Omit<UserFormData, "id"> {}

export interface UserUpdateData extends Partial<UserFormData> {}

export interface UsersResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
}
