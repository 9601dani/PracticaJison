import {Instruction} from "./instruction";
import {TablaSimbolos} from "./tabla_simbolos";
import {Variable, VariableType} from "./variable";
import {MyErrorsMini} from "../ManageError/MyErrorsMini";
import {DefManageError} from "../ManageError/DefManageError";

export class Declare extends Instruction{
  type: VariableType;
  id:string[];
  value?:Instruction
  constructor(line:number,column:number,type:VariableType,id:string[],value?:Instruction) {
    super(line,column);
    this.type=type;
    this.id =id;
    if(value){
      this.value=value;
    }


  }

  run(table: TablaSimbolos) {
          if(this.id.length===1){
            let variable1= new Variable()
            const yesExis= table.getWithId(this.id[0]);
            if(yesExis){
              /*throw new Error("la variable ya existe");*/
              MyErrorsMini.getInstanci().nuevoE(new DefManageError(this.line,this.column,"Semantico","La variable "+this.id+" ya existe"));
            }
            if(this.value){
              const valor_final= this.value.run(table);
              if(valor_final== undefined){
              /*  throw new Error("fallo en la operacion")*/
                MyErrorsMini.getInstanci().nuevoE(new DefManageError(this.line,this.column,"Semantico","La operacion no esta definida"));
              }
              if(this.type != valor_final.type){
               /* throw new Error("Los tipos son distintos")*/
                MyErrorsMini.getInstanci().nuevoE(new DefManageError(this.line,this.column,"Semantico","No puedes declarar "+variable1.mostrarVariable(this.type) +" y asignarle "+variable1.mostrarVariable(valor_final.type)));
              }
              variable1.value=valor_final.value
            }
            variable1.id= this.id[0];
            variable1.type= this.type;
            table.nuevo(variable1)
          }else if(this.id.length>1 && this.value){
            /*throw new Error("no se puede asignar un valor, si declaras mas de una variable")*/
            MyErrorsMini.getInstanci().nuevoE(new DefManageError(this.line,this.column,"Semantico","No puedes asignar mas de 1 variable y asignarle valor al mismo tiempo"));
          }else if(this.id.length>1){
            this.id.forEach((elemento)=>{
               let variable1= new Variable()
              const yesExis= table.getWithId(elemento);
              if(yesExis){
               /* throw new Error("la variable ya existe");*/
                MyErrorsMini.getInstanci().nuevoE(new DefManageError(this.line,this.column,"Semantico","La variable "+this.id+" ya existe"));
              }
              if(this.value){
                const valor_final= this.value.run(table);
                if(valor_final== undefined){
                /*  throw new Error("fallo en la operacion")*/
                  MyErrorsMini.getInstanci().nuevoE(new DefManageError(this.line,this.column,"Semantico","La operacion no esta definida"));
                }
                if(this.type != valor_final.type){
                 /* throw new Error("Los tipos son distintos")*/
                  MyErrorsMini.getInstanci().nuevoE(new DefManageError(this.line,this.column,"Semantico","No puedes declarar "+variable1.mostrarVariable(this.type) +" y asignarle "+variable1.mostrarVariable(valor_final.type)));
                }
                variable1.value=valor_final.value
              }
              variable1.id= elemento;
              variable1.type= this.type;
              table.nuevo(variable1)
            })
          }
      }

   /* this.id.forEach((id:string)=>{
      let variable= table.exist(id);
      if(variable){
        throw new Error("la variable declara ya existe-> "+id)
      }
    })

     //TODO: validacion del mismo tipo de variable
      this.id.forEach((id:string)=>{
        const yesExis= table.exist(id);
        if(yesExis){
          throw new Error("ya se definio la variable")
        }
        let variable1 = new Variable();
        variable1.id=id;
        variable1.type= this.type;
        table.nuevo(variable1)
      })
  }*/

}
