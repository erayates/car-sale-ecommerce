import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase/auth";
import {
  Timestamp,
  setDoc,
  doc,
} from "firebase/firestore";

export async function POST(req: NextRequest) {
  try {
    const { email, firstName, lastName, uid } = await req.json();
    const docRef = doc(db, "users", uid);
    const docData = {
      email: email,
      createdAt: Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
      address: {
        addresLine: "",
        country: "",
        province: "",
      },
      firstName: firstName,
      lastName: lastName,
      avatar: `https://ui-avatars.com/api/?name=${firstName}+${lastName}`,
      phone: "",
      onlineStatus: false,
    };

    await setDoc(docRef, docData, { merge: true });
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
