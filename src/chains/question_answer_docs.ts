import { PineconeClient, UpsertRequest } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores";
import { OpenAIEmbeddings } from "langchain/embeddings";
import { OpenAI } from "langchain/llms";
import { callVectorDBQAChain } from "lib/vectorstoreutils";

const pinecone = new PineconeClient();

type PineConeMetadata = Record<string, any>;

export const run = async () => {
  try {
    //initialize the vectorstore to store embeddings
    await pinecone.init({
      environment: `${process.env.PINECONE_ENVIRONMENT}`,
      apiKey: `${process.env.PINECONE_API_KEY}`,
    });

    // retrieve API operations for index created in pinecone dashboard
    const index = pinecone.Index("langchainjsfundamentals");

    // crosscheck your index (that contains embeddings of your docs) exists in the vectorstore
    const indexData = await index.describeIndexStats({
      describeIndexStatsRequest: {},
    });

    console.log("indexData", indexData);

    const query = "How many new jobs did the economy create last year?";
    const namespace = "test"; //change this to your own vectorbase namespace

    const response = await callVectorDBQAChain(query, index, namespace);
    console.log("answer", response);
    // { text: ' Over 6.5 million new jobs were created last year.' }
  } catch (error) {
    console.log("error", error);
  }
};
