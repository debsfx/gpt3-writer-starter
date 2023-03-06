import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `Build a fast gaming pc based on the budget in USD below. The design should include, a motherboard, processor, memory, graphics card, storage, power supply and case. Include the name and price of each part. Include the sum total of all of the parts in USD.

Budget:
`;

const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`);

  const baseCompletion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.5,
    max_tokens: 350,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  // const secondPrompt = `Take the price of each part and display the sum total below. Also add the name & price of each part in part list.

  // Computer Parts:${basePromptOutput.text}

  // Part list:
  // Total:

  // `;

  // // I call the OpenAI API a second time with Prompt #2
  // const secondPromptCompletion = await openai.createCompletion({
  //   model: "text-davinci-003",
  //   prompt: `${secondPrompt}`,
  //   // I set a higher temperature for this one. Up to you!
  //   temperature: 0.2,
  //   // I also increase max_tokens.
  //   max_tokens: 350,
  // });

  // const secondPromptOutput = secondPromptCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
  // res.status(200).json({ output: secondPromptOutput });
};

export default generateAction;
