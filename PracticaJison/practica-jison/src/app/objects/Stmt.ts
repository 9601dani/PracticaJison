
import {Atributo} from "./Atributo";

export class Stmt {
  statemens!: Array<Atributo>
  constructor(statements:Array<Atributo> ) {
      this.statemens = statements;
  }

}
