import UsersContainer from "@/containers/dashboard/users-container";
import { UserType } from "@/types/user";

async function getUsers() {
  const response = await fetch(`http://localhost:3000/api/v1/users`);
  return response;
}
export default async function Users() {
  const response = await getUsers();
  if (response.ok) {
    const users = await response.json();
    return <UsersContainer users={users} />;
  }
}
