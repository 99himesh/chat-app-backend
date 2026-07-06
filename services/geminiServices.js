const {GoogleGenAI} =require("@google/genai")
const ai = new GoogleGenAI({});




const generateText=async(text)=>{
   try {
     const interaction = await ai.interactions.create({
     model: "gemini-3.5-flash",
     input: text
     });
     console.log(interaction.output_text,"interaction.output_text");
     
     return  JSON.parse(interaction.output_text);
   } catch (error) {
     console.log(error);
     
   }
}



module.exports={
    generateText
}