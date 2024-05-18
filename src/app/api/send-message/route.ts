import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

import { Message } from "@/model/User";

export async function POST(request: Request) {
  await dbConnect();

  const { username, content } = await request.json();

  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    //is accepting usermessages

    if(!user.isAcceptingMessage){
        return Response.json(
            { success: false, message: "User not accepting message" },
            { status: 403 }
          );
    }

    const newMessage = {
        content,
        createdAt : new Date()
    }

    user.message.push(newMessage as Message)
    await user.save()
    console.log(user)
    return Response.json(
        { success: true, message: "Message Sent Successfully" },
        { status: 200 }
      );
  } catch (error) {
    console.log(error)
    return Response.json(
        { success: false, message: "Message Failed to send" },
        { status: 500 }
      );
  }
}
