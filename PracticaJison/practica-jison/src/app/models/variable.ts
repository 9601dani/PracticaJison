import {DecimalPipe} from "@angular/common";

export class Variable{
  public id?:string;
  public type!: VariableType;
  public value?: any;
}

export enum VariableType{
  TEXT,
  INT,
  DECIMAL,
  BOOLEAN
}
