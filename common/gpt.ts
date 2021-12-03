// document
// https://beta.openai.com/

export const GPT_LIST = [
  {
    name: "Recipe generator",
    placeholder:
      "Write a recipe based on these ingredients and instructions:\n\nFrito Pie\n\nIngredients:\nFritos\nChili\nShredded cheddar cheese\nSweet white or red onions, diced small\nSour cream\n\nDirections:",
    args: {
      temperature: 0,
      maxTokens: 120,
      topP: 1.0,
      frequencyPenalty: 0.0,
      presencePenalty: 0.0,
    },
  },
  {
    name: "Restaurant review creator",
    placeholder: `Write a restaurant review based on these notes:\nName: The Blue Wharf\nLobster great, noisy, service polite, prices good.\n\n Review:`,
    args: {
      temperature: 0.3,
      maxTokens: 64,
      topP: 1.0,
      frequencyPenalty: 0.0,
      presencePenalty: 0.0,
    },
  },
  {
    name: "Essay outline",
    placeholder:
      "Create an outline for an essay about Walt Disney and his contributions to animation:\n\nI: Introduction",
    args: {
      temperature: 0.7,
      maxTokens: 60,
      topP: 1.0,
      frequencyPenalty: 0.0,
      presencePenalty: 0.0,
    },
  },
  {
    name: "Grammar correction",
    placeholder:
      "Original: She no went to the market.\nStandard American English:",
    args: {
      temperature: 0,
      maxTokens: 60,
      topP: 1.0,
      frequencyPenalty: 0.0,
      presencePenalty: 0.0,
      stop: ["\n"],
    },
  },
  {
    name: "Chat",
    placeholder:
      "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: I'd like to cancel my subscription.\nAI:",
    args: {
      temperature: 0.9,
      maxTokens: 150,
      topP: 1,
      frequencyPenalty: 0.0,
      presencePenalty: 0.6,
      stop: ["\n", " Human:", " AI:"],
    },
  },
] as const;

export type FormTypeNames = typeof GPT_LIST[number]["name"];
