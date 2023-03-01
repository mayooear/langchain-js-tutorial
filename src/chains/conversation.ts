import { OpenAI } from "langchain/llms";
import { ConversationChain } from "langchain/chains";

//prebuilt from chat bot experience
export const run = async () => {
  const model = new OpenAI({});
  const chain = new ConversationChain({ llm: model });
  const res1 = await chain.call({ input: "Hi! I'm Jim." });
  console.log({ res1 });
  /**
   * {
  res1: {
    response: " Hi Jim! I'm an AI. It's nice to meet you. What do you do?"   
  }
}
   */
  const res2 = await chain.call({ input: "What's my name?" });
  console.log({ res2 });
  /**
   * { res2: { response: ' You said your name is Jim. Is that correct?' } }
   */
};
