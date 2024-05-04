import UsersContainer from "@/containers/dashboard/users-container";

async function getUsers() {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/users`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export default async function Users() {
  const users = await getUsers();
  return <UsersContainer users={users} />;
}
