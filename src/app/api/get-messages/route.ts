import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function GET(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      { success: false, message: "Not Authenticated" },
      { status: 401 }
    );
  }

  const userId = user._id;

  try {
    const user = await UserModel.findById(userId) 
    const messages = user?.message
    if (messages?.length == 0) {
      return Response.json(
        { success: true, message: "No Messages", messageData: [] },
        { status: 200 }
      );
    }
    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 401 }
      );
    }

    return Response.json(
      { success: true, messages: messages},
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, message: "Error while Geting Status" },
      { status: 401 }
    );
  }
}
