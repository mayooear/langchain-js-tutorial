import { OpenAI } from "langchain/llms";
import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";
/**
 * A basic chain sends an instruction (prompt) to a large language model
 * like OpenAI, which replies with a response
 *  */

export const run = async () => {
  const model = new OpenAI({ temperature: 0.1 });
  const template = "What is the capital city of {country}?";
  const prompt = new PromptTemplate({ template, inputVariables: ["country"] });
  // create a chain that takes the user input, format it and then sends to LLM
  const chain = new LLMChain({ llm: model, prompt });
  // run the chain by passing the input
  const res = await chain.call({ country: "France" });
  console.log({ res });
  // output: {text: 'Paris'}
};
