import { FewShotPromptTemplate, PromptTemplate } from "langchain/prompts";

/**
 * "Few shot" are examples provided to the LLM to help it generate a better response.
 */

export const run = async () => {
  /* First, create the list of few shot examples. */
  const examples = [
    { country: "United States", capital: "Washington, D.C." },
    { country: "Canada", capital: "Ottawa" },
  ];
  /** Next, we specify the template to format the examples we have provided.
    We use the `PromptTemplate` class for this. */
  const exampleFormatterTemplate = "Country: {country}\nCapital: {capital}\n";
  const examplePrompt = new PromptTemplate({
    inputVariables: ["country", "capital"],
    template: exampleFormatterTemplate,
  });
  console.log("examplePrompt", examplePrompt.format(examples[0]));
  /* country: United States
    capital: Washington, D.C.
  */

  /* # Finally, we create the `FewShotPromptTemplate` object.
  It takes in the few shot examples and formatter.
  */
  const fewShotPrompt = new FewShotPromptTemplate({
    /* These are the examples we want to insert into the prompt. */
    examples,
    /* This is how we want to format the examples when we insert them into the prompt. */
    examplePrompt,
    /* The prefix is some text that goes before the examples in the prompt. Usually, this consists of intructions. */
    prefix: "What is the capital city of the country below?",
    /* The suffix is some text that goes after the examples in the prompt. Usually, this is where the user input will go */
    suffix: "Country: {country}\nCapital:",
    /* The input variables are the variables that the overall prompt expects. */
    inputVariables: ["country"],
    /* The example_separator is the string we will use to join the prefix, examples, and suffix together with. */
    exampleSeparator: "\n\n",
    /* The template format is the formatting method to use for the template. Should usually be f-string. */
    templateFormat: "f-string",
  });
  /* We can now generate a prompt using the `format` method. */
  const res = fewShotPrompt.format({ country: "France" });
  console.log({ res });
  /**
   * {
   *    res: 
   *    "What is the capital city of the country below?"
   *    
   *    "Country: United States"
   *    "Capital: Washington, D.C."
   *    
   *     'Country: Canada'
        'Capital: Ottawa'

        'Country: France' 
        'Capital:'
   * }
   */
};
