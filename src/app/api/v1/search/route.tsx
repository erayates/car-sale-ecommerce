import { db } from "@/lib/firebase/auth";
import { and, collection, getDocs, query, where } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const advertsRef = collection(db, "adverts");
    let firestoreQuery = query(advertsRef);
    let whereClauses: any[] = [];

    searchParams.forEach((value, key) => {
      if (key === "minPrice") {
        whereClauses.push(where("price", ">=", Number(value)));
      } else if (key === "maxPrice") {
        whereClauses.push(where("price", "<=", Number(value)));
      } else if (key === "minYear") {
        whereClauses.push(where("yearOfModel", ">=", Number(value)));
      } else if (key === "maxYear") {
        whereClauses.push(where("yearOfModel", "<=", Number(value)));
      } else if (key === "minMileage") {
        whereClauses.push(where("mileage", ">=", Number(value)));
      } else if (key === "maxMileage") {
        whereClauses.push(where("mileage", "<=", Number(value)));
      } else {
        whereClauses.push(where(key, "==", value));
      }
    });

    whereClauses.forEach((whereClause) => {
      firestoreQuery = query(firestoreQuery, whereClause);
    });

    const querySnapshot = await getDocs(firestoreQuery);
    if (querySnapshot.empty) {
      return NextResponse.json([], { status: 200 });
    }

    const adverts = querySnapshot.docs.map((doc) => doc.data());

    console.log(adverts);

    return NextResponse.json(adverts, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error!", err: err },
      { status: 500 }
    );
  }
}
