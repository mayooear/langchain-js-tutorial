import { PromptTemplate } from "langchain/prompts";
/**
 * In reality, you would get a user's input and then add it to your prompt
 * before sending it to the large language model.
 */
export const run = async () => {
  const template = "What is the capital city of {country}?";
  const prompt = new PromptTemplate({
    inputVariables: ["country"],
    template: template, // your template without external input
  });

  const res = prompt.format({
    country: "France",
  });
  console.log(res);
  // output: "What is the capital city of France?"
};
