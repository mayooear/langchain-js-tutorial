import { OpenAI } from "langchain/llms";
import { loadQAChain } from "langchain/chains";
import { Document } from "langchain/document";

/**
 * Takes input docs and a question sent to LLM for answer based on relevant docs
 */
export const run = async () => {
  const model = new OpenAI({});
  // question and answer chain
  const chain = loadQAChain(model);
  // your docs
  const docs = [
    new Document({ pageContent: "Rachel went to Harvard" }),
    new Document({ pageContent: "Tom went to Stanford" }),
  ];
  console.log("docs", docs);
  /**
   *[
  Document { pageContent: 'Rachel went to Harvard', metadata: {} },
  Document { pageContent: 'Tom went to Stanford', metadata: {} }
]
   */

  //call the chain with both the doc and question
  const res = await chain.call({
    input_documents: docs,
    question: "Where did rachel go to college",
  });
  console.log({ res });
  /**
   * { res: { text: ' Rachel went to Harvard.' } }
   */
};
