import { db } from "@/lib/firebase/auth";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const messageId = params.id;
    const messagesRef = doc(db, "messages", messageId);
    await deleteDoc(messagesRef);

    return NextResponse.json(
      { message: "You deleted an item successfully!" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await req.json();
    const messagesId = params.id;
    const messageDocRef = doc(db, "messages", messagesId);
    await setDoc(messageDocRef, { status: status }, { merge: true });

    return NextResponse.json(
      {
        message: "Message status changed successfully!",
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "Internal Server Error!",
      },
      { status: 200 }
    );
  }
}
