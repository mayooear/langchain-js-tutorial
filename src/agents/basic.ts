import { OpenAI } from "langchain";
import { initializeAgentExecutor } from "langchain/agents";
import { SerpAPI, Calculator } from "langchain/tools";

/**
 * Agents are like bots/personal assistants that can take actions using external
 * tools based on instructions from the LLM
 */

export const run = async () => {
  const model = new OpenAI({ temperature: 0 });
  // A tool is a function that performs a specific duty
  // SerpAPI for example accesses google search results in real-time
  const tools = [new SerpAPI(), new Calculator()];

  const executor = await initializeAgentExecutor(
    tools,
    model,
    "zero-shot-react-description" //a framework to decide what tool to use based on tool's description
  );
  console.log("Loaded agent.");

  const input = `What are the total number of countries in Africa raised to the power of 3?`;

  console.log(`Executing with input "${input}"...`);

  const result = await executor.call({ input });

  console.log(`Got output ${result.output}`);
  /**
   *   Got output, there are 54 countries in Africa
   *   The number of countries raised to the power of 3
   *    is 157464
   */
};
