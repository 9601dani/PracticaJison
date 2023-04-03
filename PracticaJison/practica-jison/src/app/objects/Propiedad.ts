import {TypePropiedad} from "./TypePropiedad";

export class Propiedad{
  name_property!: string;
  type_property!: TypePropiedad;

  constructor(name_property: string, type_property: TypePropiedad) {
    this.name_property= name_property;
    this.type_property= type_property;
  }
}
