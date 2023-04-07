import {DecimalPipe} from "@angular/common";

export class Variable{
  public id?:string;
  public type!: VariableType;
  public value?: any;

      mostrarVariable(num:number):String{
        switch (num){
          case 0:
            return "TEXT"
          case 1:
            return "INT"
          case 2:
            return "DECIMAL"
          case 3:
            return "BOOLEAN"
        }
        return "null"
      }
}

export enum VariableType{
  TEXT,
  INT,
  DECIMAL,
  BOOLEAN,

}
