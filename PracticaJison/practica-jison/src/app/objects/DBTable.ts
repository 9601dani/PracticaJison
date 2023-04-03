import { Stmt } from "./Stmt";
import {Propiedad} from "./Propiedad";
import {DataB} from "./DataB";
export class DBTable {
  objDb!: DataB;
  statements !: Array<Stmt>;
  constructor(objDb:DataB, statements: Array<Stmt>) {
      this.objDb=objDb;
      this.statements= statements;
  }
}
