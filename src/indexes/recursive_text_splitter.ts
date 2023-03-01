import { Document } from "langchain/document";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import fs from "fs";
import path from "path";

/**
 * Language models limit the amount of text that you can send to them per request.
 *  To overcome this challenge, we need to split the text into smaller chunks.
 */

export const run = async () => {
  const text = `Hi.\n\nI'm Harrison.\n\nHow? Are? You?\nOkay then f f f f.
    This is a weird text to write, but gotta test the splittingggg some how.\n\n
    Bye!\n\n-H.`;
  /**
   * Recursivecharactertextsplitter splits a document "recursively" using '\n\n'
   * then "\n" and finally " ".
   * It helps to ensure that chunks mantain relevancy.
   */
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 10, //max size(chars) of docs chunk
    chunkOverlap: 1, //how much overlap betwen chunks
  });
  const output = splitter.createDocuments([text]);
  console.log(output);

  /**
   * output:
   * [
  Document { pageContent: 'Hi.', metadata: {} },      
  Document { pageContent: "I'm", metadata: {} },      
  Document { pageContent: 'Harrison.', metadata: {} },  Document { pageContent: 'How? Are?', metadata: {} },  Document { pageContent: 'You?', metadata: {} },     
  Document { pageContent: 'Okay then f', metadata: {} 
},
  Document { pageContent: 'f f f f.', metadata: {} }, 
  Document { pageContent: 'This is a', metadata: {} },  Document { pageContent: 'a weird', metadata: {} },  
  Document { pageContent: 'text to', metadata: {} },  
  Document { pageContent: 'write, but', metadata: {} },
  Document { pageContent: 'gotta test', metadata: {} },
  Document { pageContent: 'the', metadata: {} },      
  Document { pageContent: 'splitting', metadata: {} },  Document { pageContent: 'gggg', metadata: {} },     
  Document { pageContent: 'some how.', metadata: {} },  Document { pageContent: 'Bye!', metadata: {} },     
  Document { pageContent: '-H.', metadata: {} }       
]
   */
};
