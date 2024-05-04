import { NextRequest, NextResponse } from "next/server";
import { getDoc, doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/auth";
import { auth } from "@/lib/firebase/firebase-admin";

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
    const { email, avatar } = await req.json();
    if (email) {
      await setDoc(userDocRef, { email: email }, { merge: true });
    }

    if (avatar) {
      await setDoc(userDocRef, { avatar: avatar }, { merge: true });
    }

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
        firstName,
        lastName,
        phone,
        address: {
          addressLine,
          province,
          country,
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    const userRef = doc(db, "users", userId);

    await auth.deleteUser(userId);
    await deleteDoc(userRef);

    return NextResponse.json(
      {
        message: "User deleted successfully!",
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error", error: err },
      { status: 500 }
    );
  }
}
