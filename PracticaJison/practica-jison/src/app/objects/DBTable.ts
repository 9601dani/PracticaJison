import { Stmt } from "./Stmt";
import {DataB} from "./DataB";
import {Atributo} from "./Atributo";
import {BaseDeDatos} from "./BaseDeDatos";
export class DBTable {
  objDb!: DataB;
  statem !: Array<Stmt>;
  constructor(objDb:DataB) {
      this.objDb=objDb;
      this.statem=[];
  }

  static constructo(state:Array<Stmt>,statem: Array<Stmt>){

      statem.forEach((elemento:Stmt, indice:number)=>{
        state.push(elemento);
      });

  }
  /*public añadirStmt(stms:Stmt){
    let base_array=BaseDeDatos.getInstancia().getArrayTable();
    console.log(stms)
    /!*for (let i=0; i<stms.statemens.length-1;i++){
      for(let j=i+1; j< stms.statemens.length; j++){
        if(stms.statemens[i].name_atribute== stms.statemens[j].name_atribute){
          throw new Error("No se puede definir la misma propiedad dos veces");
        }
      }
    }*!/


    base_array[base_array.length-1].statem.push(stms);
  }*/



}
