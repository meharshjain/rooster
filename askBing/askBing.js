import { BingChat } from "bing-chat";
import dotenv from "dotenv";
import say from "say";

dotenv.config();
/**
 * Demo CLI for testing conversation support.
 *
 * ```
 * npx tsx demos/demo-conversation.ts
 * ```
 */
async function askBing(prompt) {
  const api = new BingChat({ cookie: process.env.BING_COOKIE });

  const res = await api.sendMessage(prompt, {});

  // Function to make the bot read the response
  function readResponse(text) {
    say.speak(text);
  }
  readResponse(res.text);
}

export default askBing