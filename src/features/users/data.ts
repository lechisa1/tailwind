import type { User } from "@/types/user";

export const INITIAL_USERS: User[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    role: "Editor",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Charlie Davis",
    email: "charlie@example.com",
    role: "Viewer",
    status: "Active",
  },
  {
    id: 4,
    name: "Diana Prince",
    email: "diana@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 5,
    name: "Ethan Hunt",
    email: "ethan@example.com",
    role: "Editor",
    status: "Inactive",
  },
];
