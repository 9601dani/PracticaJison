import {Propiedad} from "./Propiedad";

export class DataB {
  name_table!:string;
  propiedades!: Array<Propiedad>;

  constructor(nameTable:string,propiedades:Array<Propiedad>) {
    this.name_table= nameTable;
    this.propiedades= propiedades;
  }
}
