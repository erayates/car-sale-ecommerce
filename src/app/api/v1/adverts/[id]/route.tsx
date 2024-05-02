import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  documentId,
  getDoc,
  doc,
  setDoc,
  deleteDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import slugify from "slugify";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const queryParams = req.nextUrl.searchParams;
    const isSlug = queryParams.get("isSlug");
    const advertId = params.id;
    const advertsRef = collection(db, "adverts");

    if (isSlug) {
      const q = query(advertsRef, where("slug", "==", advertId));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        return NextResponse.json(
          {
            message: "There is no advert with that slug.",
          },
          {
            status: 404,
          }
        );
      }

      const advert = {
        ...querySnapshot.docs[0].data(),
        id: querySnapshot.docs[0].id,
      };
      return NextResponse.json(advert, { status: 200 });
    }

    const q = query(advertsRef, where(documentId(), "==", advertId));
    // Execute the query to retrieve data from Firestore
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json({ message: "No data found." }, { status: 404 });
    }

    const advert = {
      ...querySnapshot.docs[0].data(),
      id: querySnapshot.docs[0].id,
    };

    return NextResponse.json(advert, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error", error: err },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const advertId = req.url.split("/").pop();
    const advertDocRef = doc(db, "adverts", advertId);
    const advert = (await getDoc(advertDocRef)).data();

    const { favorite } = await req.json();

    if (favorite.isFavorite) {
      if (advert.favorites.includes(favorite.uid)) {
        return NextResponse.json({ message: "You already favorited this ad." });
      }

      await setDoc(
        advertDocRef,
        { favorites: [...advert.favorites, favorite.uid] },
        { merge: true }
      );

      return NextResponse.json(
        {
          message: "You added this advert to your favorites.",
        },
        { status: 200 }
      );
    } else {
      if (advert.favorites.includes(favorite.uid)) {
        const removedUserFavArr = advert.favorites.filter(
          (id: string) => id !== favorite.uid
        );
        await setDoc(
          advertDocRef,
          { favorites: removedUserFavArr },
          { merge: true }
        );

        return NextResponse.json(
          {
            message: "You removed this advert from your favorites",
          },
          {
            status: 200,
          }
        );
      }
      return NextResponse.json({
        message: "You cant unfavorite this ad because you didnt favorite it.",
      });
    }

    // const reqBody = await req.json();

    // const advertsRef = collection(db, "adverts");
    // const q = query(advertsRef, where(documentId(), "==", advertId));
    // const querySnapshot = await getDocs(q);

    // const advert = querySnapshot.docs[0].data();
    // if (querySnapshot.empty) {
    //   return NextResponse.json({ message: "No data found." }, { status: 404 });
    // }
  } catch (err) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const advertId = params.id;
    const advertsRef = doc(db, "adverts", advertId);
    await deleteDoc(advertsRef);

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
    const reqBody = await req.json();
    const advertId = params.id;
    const advertDocRef = doc(db, "adverts", advertId);
    const docData = {
      ...reqBody,
      status: "pending",
      updatedAt: Timestamp.fromDate(new Date()),
      enginePower: Number(reqBody.enginePower),
      engineSize: Number(reqBody.engineSize),
      mileage: Number(reqBody.mileage),
      price: Number(reqBody.price),
      yearOfModel: Number(reqBody.yearOfModel),
      favorites: [],
      slug: slugify(reqBody.title),
    };

    await updateDoc(advertDocRef, docData);

    return NextResponse.json(
      { message: "Advert updated. successfully." },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Error.", error: err },
      { status: 500 }
    );
  }
}
