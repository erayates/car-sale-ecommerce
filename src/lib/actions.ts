export const createUser = async (data: any, uid: string) => {
  try {
    const res = await fetch("/api/v1/register", {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        uid: uid,
        role: "user",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  } catch (err) {
    return { message: err };
  }
};

export const deleteAdvert = async (advertId: string) => {
  const response = await fetch(`/api/v1/adverts/${advertId}`, {
    method: "DELETE",
  });

  return response;
};
