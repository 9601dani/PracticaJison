import {Propiedad} from "./Propiedad";

export class DataB {
  name_table!:String;
  propiedades!: Array<Propiedad>;

  constructor(nameTable:string,propiedades:Array<Propiedad>) {
    this.name_table= nameTable;
    this.propiedades= propiedades;
  }
}
