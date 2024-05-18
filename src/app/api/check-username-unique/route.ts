import {z} from "zod"
import dbConnect from "@/lib/dbConnect"
import UserModel from "@/model/User"
import { usernameValidation } from "@/schemas/signupSchema"

const UsernameQuerySchema = z.object({
    username : usernameValidation
})

export async function GET(req:Request) {
    await dbConnect()
    try {
        const {searchParams} = new URL(req.url)
        const queryParam = {
            username : searchParams.get('username')
        }
        //validate with zod
        const result = UsernameQuerySchema.safeParse(queryParam)
        // console.log(result)

        if(!result.success){
            const userNameErrors = result.error.format()._errors || []
            return Response.json({success : false, message : userNameErrors?.length > 0 ? userNameErrors.join(', ') : "Invalid Query Parameters"}, {status : 400})
        }
        const {username} = result.data

        const existingVerifiedUser = await UserModel.findOne({username, isVerified : true})

        if(existingVerifiedUser){
            return Response.json({success : false, message : "username is already taken"}, {status : 400})
        }

        return  Response.json({success : true, message : "Username is unique"}, {status : 200})

    } catch (error) {
        console.error("error checking username", error)
        return Response.json({
            success : false,
            message : "error checking username",
        }, {status : 500})
    }
}