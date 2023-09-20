import connectDB from "@/database/connection";
import User from "@/database/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { username, email, password } = await req.json();

    if (!password || password.length < 6) {
      return NextResponse.json(
        { message: "This field must be at least 6 characters" },
        { status: 400 }
      );
    }

    const userFound = await User.findOne({ email });
    if (userFound) {
      return NextResponse.json(
        { message: "The email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ username, password: hashedPassword, email });
    const userSaved = await newUser.save();
    return NextResponse.json(userSaved);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}
