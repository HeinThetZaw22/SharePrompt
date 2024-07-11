import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB();
        const prompts = await Prompt.find({}).populate('creater');
        // console.log(prompts);
        return new Response(JSON.stringify(prompts),{
            status : 200
        })
    } catch (error) {
        return new Response("Failed to load all prompts", {
            status: 500
        })
    }
}