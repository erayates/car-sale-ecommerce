import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  documentId,
  Timestamp,
  addDoc,
} from "firebase/firestore";

export async function POST(req: NextRequest) {
  try {
    const { email, firstName, lastName } = await req.json();
    const usersRef = collection(db, "users");
    const docData = {
      email: email,
      createdAt: Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
      address: {
        addresLine: "",
        country: "",
        district: "",
        province: "",
      },
      firstName: firstName,
      lastName: lastName,
      avatar: "",
      phone: `https://ui-avatars.com/api/?name=${firstName}+${lastName}`,
    };

    await addDoc(usersRef, docData);
    return NextResponse.json(
      { message: "User created successfully." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Internal Error." }, { status: 500 });
  }

  //   const querySnapshot = await getDocs(
  //     query(collection(db, "users"), where("email", "==", userEmail))
  //   );

  //   if (querySnapshot.empty) {
  //     return NextResponse.json({ message: "No data found." }, { status: 404 });
  //   }

  //   const user = querySnapshot.docs[0].data();
  //   return NextResponse.json(user, {
  //     status: 200,
  //   });
}
