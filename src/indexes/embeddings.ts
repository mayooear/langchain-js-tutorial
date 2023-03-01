import { OpenAIEmbeddings } from "langchain/embeddings";
/**
 * Embeddings are vector (floating point number) representations of text that computers
 * can understand, analyze, and compare.
 */

export const run = async () => {
  /* Embed query from the user */
  const embeddings = new OpenAIEmbeddings();
  const res = await embeddings.embedQuery("Hello world");
  console.log("query vector", res);

  //
  /* Embed documents (converts your text/data to numbers) */
  const documentRes = await embeddings.embedDocuments([
    "Hello world",
    "Bye bye",
  ]);
  console.log({ documentRes });
  //
};
