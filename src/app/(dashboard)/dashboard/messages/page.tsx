import MessagesContainer from "@/containers/dashboard/messages-container";

async function getMessages() {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/messages`, {
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

export default async function Messages() {
  const messages = await getMessages();
  return <MessagesContainer messages={messages} />;
}
