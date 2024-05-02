import { db } from "@/lib/firebase/auth";
import { Timestamp, addDoc, collection, getDocs } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const messagesCollection = collection(db, "messages");
    const messages = await getDocs(messagesCollection);
    const data = messages.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    if (data) {
      return NextResponse.json(data, { status: 200 });
    }

    return NextResponse.json([], { status: 200 });
  } catch (err) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 200 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const messagesCollection = collection(db, "messages");
    const docData = {
      ...reqBody,
      status: "unread",
      createdAt: Timestamp.fromDate(new Date()),
    };

    await addDoc(messagesCollection, docData);

    return NextResponse.json(
      {
        message: "Contact message added successfully.",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
