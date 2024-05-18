import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcryptjs from "bcryptjs";



export async function POST(request : Request){
    await dbConnect()
    const User = await UserModel.find({})
    try {
        const {username, email, password} = await request.json()

        const existingUserVerifiedByUsername = await UserModel.findOne({username, isVerified: true})

        if(existingUserVerifiedByUsername){
            return Response.json({success : false, message: "username is already taken"}, {status: 400})
        }

        const existingUserVerifiedByEmail = await UserModel.findOne({email})

        const verifyCode = Math.floor(100000 + Math.random()* 900000).toString()
        
        if(existingUserVerifiedByEmail){
            if(existingUserVerifiedByEmail.isVerified){
                return Response.json({success : false, message: "user already exist with this email"}, {status: 400})
            }else{
                const hashedPassword = await bcryptjs.hash(password, 10)
                existingUserVerifiedByEmail.password = hashedPassword;
                existingUserVerifiedByEmail.verifyCode = verifyCode;
                existingUserVerifiedByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)

                await existingUserVerifiedByEmail.save()
            }
        }else{
            const hashedPassword = await bcryptjs.hash(password, 10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 10)

            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified : false,
                isAcceptingMessage: true,
                message: [],
            })
            await newUser.save()
        }

        //send verification email

        const emailResponse = await sendVerificationEmail(email, username, verifyCode)
        if(!emailResponse.success){
            return Response.json({success : false, message : emailResponse.message}, {status : 500})
        }
        return Response.json({success : true, message : 'user registered successfully, please verify your email'}, {status : 200})
    } catch (error) {
        console.error("error while registering", error)
        return Response.json({success : false, message : "Error While registring"}, {status : 500})
    }

}