import { Stmt } from "./Stmt";
import {Propiedad} from "./Propiedad";
import {DataB} from "./DataB";
export class DBTable {
  objDb!: DataB;
  statem !: Array<Stmt>;
  constructor(objDb:DataB) {
      this.objDb=objDb;
  }

  static constructo(state:Array<Stmt>,statem: Array<Stmt>){

      statem.forEach((elemento:Stmt, indice:number)=>{
        state.push(elemento);
      });

  }
}
