import AccountContainer from "@/containers/app/account-container";

async function getAdverts() {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/adverts`, {
      cache: "no-store",
    });
    return await response.json();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch data.");
  }
}

export default async function Account() {
  const adverts = await getAdverts();
  return <AccountContainer adverts={adverts} />;
}
