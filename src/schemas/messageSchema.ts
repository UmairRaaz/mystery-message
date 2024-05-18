import {z} from "zod"

export const messageSchema = z.object({
    content : z.string().min(5, {message : "content should be at least 5 char"}).max(300, {message : "content must be less than 300 characters"}),
})