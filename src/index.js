import database from "./../database.json";
import Person from "./person.js";
import TerminalController from "./terminalController.js";
import { save } from "./repository.js";

const DEFAULT_LANG = "pt-BR";
const STOP_TERM = ":q";

const terminalController = new TerminalController();
terminalController.initializeTerminal(database, DEFAULT_LANG);

async function mainLoop() {
  try {
    const answer = await terminalController.question("What??");
    if (answer === STOP_TERM) {
      terminalController.closeTerminal();
      console.log("process finished!");
      return;
    }

    const person = Person.generateInstanceFromString(answer);
    terminalController.updateTable(person.formatted(DEFAULT_LANG));

    await save(person);

    return mainLoop();
  } catch (error) {
    console.error("Opssss!***", error);
    return mainLoop();
  }
}

await mainLoop();

/**
 * 1 Aviao,Navio,Bicicleta 100000 2001-07-27 2002-10-20
 */
