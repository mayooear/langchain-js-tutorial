import { TextLoader } from "langchain/document_loaders";

//loads data from text files
export const run = async () => {
  const loader = new TextLoader(
    "src/document_loaders/example_data/example.txt"
  );
  const docs = await loader.load();
  console.log({ docs });
  /**
   * {
  docs: [
    Document {
      pageContent: 'this is an example text to see how langchain loads raw text.',
      metadata: 
    }
  ]
}
   */
};
