import chalk from "chalk";
import chalkTable from "chalk-table";
import DraftLog from "draftlog";
import readLine from "readline";
import Person from "./person.js";

export default class TerminalController {
  constructor() {
    this.print = {};
    this.data = {};
  }

  initializeTerminal(database, language) {
    DraftLog(console).addLineListener(process.stdin);
    this.terminal = readLine.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.initializeTable(database, language);
  }

  initializeTable(database, language) {
    const data = database.map((item) => new Person(item).formatted(language));
    const table = chalkTable(this.getTableOptions(), data);

    this.print = console.draft(table);
    this.data = data;
  }

  updateTable(item) {
    this.data.push(item);
    this.print(chalkTable(this.getTableOptions(), this.data));
  }

  /**
   * question('mensagem', (erro, resposta) => {console.log(erro || resposta)})
   * para evitar trabalhar com callbacks, sempre convertemos em promises e podemos usar async/await
   */
  question(msg = "") {
    return new Promise((resolve) => this.terminal.question(msg, resolve));
  }

  closeTerminal() {
    this.terminal.close();
  }

  getTableOptions() {
    return {
      leftPad: 2,
      columns: [
        { field: "id", name: chalk.cyan("ID") },
        { field: "vehicles", name: chalk.magenta("Vehicles") },
        { field: "kmTraveled", name: chalk.yellow("Km Traveled") },
        { field: "from", name: chalk.blue("From") },
        { field: "to", name: chalk.green("To") },
      ],
    };
  }
}
