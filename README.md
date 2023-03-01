# Langchain Tutorial For Typescript and Javascript Developers

- [LangChain typescript tutorial video](https://www.youtube.com/watch?v=bH722QgRlhQ)
- The visual explanation diagram is in the `visual-image` folder.

## What is Langchain?

In simple terms, langchain is a framework and library of useful templates and tools that make it easier to build large language model applications that use custom data and external tools.

Essentially, langchain makes it easier to build chatbots for your own data and "personal assistant" bots that respond to natural language.

## Quick install

After you clone the repo, follow these instructions:

1. Install packages
   `npm install`

2. Add OpenAI, Pinecone and SerpApi keys as environment variables

- create a `.env` file in the root of the folder
- copy the environmental variables from `.env.example` into `.env` and replace with the keys from respective websites
  - [openAI](https://platform.openai.com/account/api-keys).
  - [serpAPI](https://serpapi.co)
  - [Pinecone](https://www.pinecone.io/)

## Usage

To run a specific example in the repo, simply run the bash script below and replace "examplePath" with the relative path from src/index.ts to the example file:

`npm run start {examplePath}`

For example:

`npm run start ./prompts/basic.ts`

## Resources

- [LangChainDocs](https://hwchase17.github.io/langchainjs/docs/overview)
- [PineconeDocs](https://docs.pinecone.io/docs/node-client)

## Credit

This repository heavily borrows from:

- [LangchainJS](https://github.com/hwchase17/langchainjs) - official langchain library
