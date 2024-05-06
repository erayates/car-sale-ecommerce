import DashboardContainer from "@/containers/dashboard/dashboard-container";

async function getAdverts() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/v1/adverts`,
      {
        cache: "no-store",
      }
    );
    return response.json();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch data.");
  }
}

async function getMessages() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/v1/messages`,
      {
        cache: "no-store",
      }
    );
    return response.json();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch data.");
  }
}

async function getUsers() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/v1/users`,
      {
        cache: "no-store",
      }
    );
    return response.json();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch data.");
  }
}

export default async function Dashboard() {
  const advertsData = getAdverts();
  const messagesData = getMessages();
  const usersData = getUsers();
  const [adverts, messages, users] = await Promise.all([
    advertsData,
    messagesData,
    usersData,
  ]);

  return (
    <DashboardContainer adverts={adverts} messages={messages} users={users} />
  );
}
