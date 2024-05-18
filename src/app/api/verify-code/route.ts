import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const {username, code} = await req.json();
    const decodedUsername = decodeURIComponent(username);
    const user = await UserModel.findOne({ username: decodedUsername });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "user not found",
        },
        { status: 500 }
      );
    }
    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();

      return Response.json(
        {
          success: true,
          message: "Account Verified Successfully",
        },
        { status: 200 }
      );
    } else if (!isCodeNotExpired) {
      return Response.json(
        {
          success: false,
          message: "Verification Code is Expired please signup again to get a new code",
        },
        { status: 400 }
      );
    }else{
        return Response.json(
            {
              success: false,
              message: "Incorrect verification code",
            },
            { status: 400 }
          );
    }
  } catch (error) {
    console.error("error checking username", error);
    return Response.json(
      {
        success: false,
        message: "Error while verifying user",
      },
      { status: 500 }
    );
  }
}
