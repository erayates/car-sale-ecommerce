import { NextRequest, NextResponse } from "next/server";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/auth";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const uid = req.nextUrl.pathname.split("/").pop();
    const userDocRef = doc(db, "users", uid);
    const user = (await getDoc(userDocRef)).data();

    if (user) {
      return NextResponse.json(user, {
        status: 200,
      });
    }

    return NextResponse.json(
      { message: "User not found." },
      {
        status: 404,
      }
    );
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
}

export async function PATCH(req: NextRequest, res: NextResponse) {
  try {
    const uid = req.nextUrl.pathname.split("/").pop();
    const userDocRef = doc(db, "users", uid);
    const { email } = await req.json();
    await setDoc(userDocRef, { email: email }, { merge: true });

    return NextResponse.json(
      { message: "User updated successfully." },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "User update process failed." },
      {
        status: 404,
      }
    );
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const uid = req.nextUrl.pathname.split("/").pop();
    const userDocRef = doc(db, "users", uid);
    const { firstName, lastName, addressLine, province, country, phone } =
      await req.json();
    await setDoc(
      userDocRef,
      {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        address: {
          addressLine: addressLine,
          province: province,
          country: country,
        },
      },
      { merge: true }
    );

    return NextResponse.json(
      { message: "User updated successfully." },
      {
        status: 200,
      }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "User update process failed." },
      {
        status: 404,
      }
    );
  }
}
