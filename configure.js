import axios from "axios";
import { createInterface } from "readline";
import fs from "fs";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (question) =>
  new Promise((resolve) => rl.question(question, resolve));

function exitError(error) {
  process.exit(1);
}

const banner = `
████████╗██╗    ██╗ █████╗     ████████╗███████╗███╗   ███╗██████╗ ██╗      █████╗ ████████╗███████╗
╚══██╔══╝██║    ██║██╔══██╗    ╚══██╔══╝██╔════╝████╗ ████║██╔══██╗██║     ██╔══██╗╚══██╔══╝██╔════╝
   ██║   ██║ █╗ ██║███████║       ██║   █████╗  ██╔████╔██║██████╔╝██║     ███████║   ██║   █████╗  
   ██║   ██║███╗██║██╔══██║       ██║   ██╔══╝  ██║╚██╔╝██║██╔═══╝ ██║     ██╔══██║   ██║   ██╔══╝  
   ██║   ╚███╔███╔╝██║  ██║       ██║   ███████╗██║ ╚═╝ ██║██║     ███████╗██║  ██║   ██║   ███████╗
   ╚═╝    ╚══╝╚══╝ ╚═╝  ╚═╝       ╚═╝   ╚══════╝╚═╝     ╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝
`;

let botUsername;

(async () => {
  try {
    const file = fs.readFileSync(".git/config").toString();
    const url = file.match(/url = (.*)/)[1];
  } catch (e) {}

  const accessToken = await question("Enter your bot access token: ");
  if (!accessToken?.length > 0) exitError("Token is required");

  const getBot = await axios.get(
    `https://api.telegram.org/bot${accessToken}/getMe`
  ).catch(exitError);

  botUsername = getBot.data.result.username;
  const url = `https://c03a-147-228-12-202.ngrok-free.app`;

  const resp = await axios.post(
    `https://api.telegram.org/bot${accessToken}/setChatMenuButton`,
    {
      menu_button: {
        type: "web_app",
        text: "Open",
        web_app: {
          url: url,
        },
      },
    }
  ).catch(exitError);

  if (resp.status === 200) {
    process.exit();
  } else {
    exitError(`\nSomething went wrong! ${resp.error}`);
  }
})();
