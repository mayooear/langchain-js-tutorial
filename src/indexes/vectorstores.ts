import { OpenAIEmbeddings } from "langchain/embeddings";
import { PineconeClient } from "@pinecone-database/pinecone";
import { OpenAI } from "langchain/llms";
import * as fs from "fs";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "langchain/document";

/**
 * A vectorstore is a type of database optimized for storing and retrieving
 * documents and embeddings.
 *
 */

const pinecone = new PineconeClient();

export const run = async () => {
  try {
    //initialize the vectorstore to store embeddings
    await pinecone.init({
      environment: `${process.env.PINECONE_ENVIRONMENT}`, //this is in the dashboard
      apiKey: `${process.env.PINECONE_API_KEY}`,
    });

    // initialize LLM to answer the question
    const model = new OpenAI();

    // Load file that we want to ask questions from
    const text = fs.readFileSync(
      require.resolve("../state_of_the_union.txt"),
      "utf8"
    );

    //split text into chunks
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
    });

    // create document objects of text
    const docs = textSplitter.createDocuments([text]);

    //retrieve API operations for index created in pinecone dashboard
    const index = pinecone.Index("langchainjsfundamentals");

    /*
    create embeddings to extract text from document and send to openAI for embeddings then
    add vectors to pinecone for storage
    */
    const embeddings = new OpenAIEmbeddings();
    await addDocuments(docs);

    //embeddings functions
    async function addDocuments(
      documents: Document[],
      ids?: string[]
    ): Promise<void> {
      const texts = documents.map(({ pageContent }) => pageContent);
      return addVectors(await embeddings.embedDocuments(texts), documents, ids);
    }

    async function addVectors(
      vectors: number[][],
      documents: Document[],
      ids?: string[]
    ): Promise<void> {
      //create the pinecone upsert object per vector
      const upsertRequest = {
        vectors: vectors.map((values, idx) => ({
          id: `${idx}`,
          metadata: {
            ...documents[idx].metadata,
            text: documents[idx].pageContent,
          },
          values,
        })),
        namespace: "test",
      };

      await index.upsert({
        upsertRequest,
      });
    }

    /*check your pinecone index dashboard to verify insertion
      run the code below to check your indexstats. You should see the new "namespace"
    */
    const indexData = await index.describeIndexStats({
      describeIndexStatsRequest: {},
    });
    console.log("indexData", indexData);
  } catch (error) {
    console.log("error", error);
  }
};
