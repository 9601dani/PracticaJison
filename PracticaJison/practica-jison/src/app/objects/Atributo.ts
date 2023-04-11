import {Propiedad} from "./Propiedad"
import {Stmt} from "./Stmt";
import {TypeProStmt} from "./TypeProStmt";
import {BaseDeDatos} from "./BaseDeDatos";

export  class Atributo{
  property!: TypeProStmt;
  name_atribute: string;
  constructor(property: TypeProStmt, value : string){
    this.property= property;
    this.name_atribute= value;
  }
  public añadirStmt(stms:Atributo){
    let base_array=BaseDeDatos.getInstancia().getArrayTable();
    let propiedades=base_array[base_array.length-1].objDb.propiedades;
    for(let j=0; j< base_array[base_array.length-1].statem[base_array[base_array.length-1].statem.length-1].statemens.length; j++){
      if(base_array[base_array.length-1].statem[base_array[base_array.length-1].statem.length-1].statemens[j].name_atribute===undefined){
        break;
      }
        if(base_array[base_array.length-1].statem[base_array[base_array.length-1].statem.length-1].statemens[j].name_atribute== stms.name_atribute){
          throw new Error("No se puede definir la misma propiedad dos veces");
        }
    }


    base_array[base_array.length-1].statem[base_array[base_array.length-1].statem.length-1].statemens.push(stms);
  }
  toString(){
    return String(this.name_atribute)
  }
}
