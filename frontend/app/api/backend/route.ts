import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path");

  if (!path) {
    return NextResponse.json(
      { error: "Missing path param" },
      { status: 400 }
    );
  }

  const backendUrl = `http://127.0.0.1:8000/${path}`;

  const backendRes = await fetch(backendUrl);

  if (!backendRes.ok) {
    return NextResponse.json(
      { error: "Backend returned error" },
      { status: backendRes.status }
    );
  }

  const data = await backendRes.json();
  return NextResponse.json(data);
}


