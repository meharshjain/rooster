import { BingChat } from "bing-chat";
import dotenv from "dotenv";

dotenv.config();
/**
 * Demo CLI for testing conversation support.
 *
 * ```
 * npx tsx demos/demo-conversation.ts
 * ```
 */
async function askBing(req, res, next) {
  var prompt = req.body.gender;
  const api = new BingChat({ cookie: process.env.BING_COOKIE });

  const response = await api.sendMessage(prompt, {});

  /*   // Function to make the bot read the response
  function readResponse(text) {
    say.speak(text);
  } */
  res.json({ response: response.text });
}

export default askBing;
