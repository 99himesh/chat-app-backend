const {generateText} =require("../services/geminiServices");
const predictive=async(req,res)=>{
    try {
        const {text}=req.body;
        const prompt = `
            You are a predictive typing assistant.

            Suggest exactly 3 natural next words or short phrases.

            Rules:
            - Each suggestion should contain 1 to 5 words.
            - Do not repeat the user's input.
            - Do not explain anything.
            - Do not use markdown.
            - Return ONLY a valid JSON array of strings.
            - Do not wrap the array inside an object.
            User input:
            "${text}"
            Example output:

            [
            "5 pm",
            "the office",
            "the coffee shop"
            ]
            `;
        const response=await generateText(prompt);
        res.status(200).json({success:true,message:"Generate successfully",text:response})

        
    } catch (error) {
        // console.log(error);
        
       res.status(500).send(error) 
    }
}

const smartReply=async(req,res)=>{
    try {
        const {text}=req.body;
        const prompt = `
                You are a smart reply assistant for a chat application.

                Generate exactly 3 short replies to the incoming message.

                Rules:
                - Each reply should be natural and conversational.
                - Keep each reply under 10 words.
                - Match the tone of the incoming message.
                - Do not explain anything.
                - Do not use markdown.
                - Return ONLY a valid JSON array of strings.

                Incoming message:
                "${text}"

                Example output:

                [
                "Yes, I'll be there.",
                "Running late, will join soon.",
                "Can we reschedule?"
                ]
                `;
        const response=await generateText(prompt);
        res.status(200).json({success:true,message:"Generate successfully",text:response})

        
    } catch (error) {
        // console.log(error);
        
       res.status(500).send(error) 
    }
}


module.exports={
        predictive,
        smartReply
}