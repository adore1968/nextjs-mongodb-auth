import { NextResponse } from "next/server";

export function GET(req: Request) {
  try {
    return NextResponse.json({ message: "Hello world" });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}
