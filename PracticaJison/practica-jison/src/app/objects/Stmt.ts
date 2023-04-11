
import {Atributo} from "./Atributo";
import {BaseDeDatos} from "./BaseDeDatos";

export class Stmt {
  statemens: Array<Atributo>=[]
  constructor(statements:Array<Atributo> ) {
      this.statemens = statements;
  }


}
