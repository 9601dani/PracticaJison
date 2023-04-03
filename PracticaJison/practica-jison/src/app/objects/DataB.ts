import {Propiedad} from "./Propiedad";
import {Stmt} from "./Stmt";

export class DataB {
  name_table!:String;
  propiedades!: Array<Propiedad>;

  constructor(nameTable:string,propiedades:Array<Propiedad>) {
    this.name_table= nameTable;
    this.propiedades= propiedades;
  }
}
