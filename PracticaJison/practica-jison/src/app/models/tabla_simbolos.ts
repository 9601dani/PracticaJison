import {Variable} from "./variable";

export class TablaSimbolos extends Array<Variable>{
  constructor(parent?: TablaSimbolos) {
    super();
    if(parent){/*si hay padre se le asigna*/
      this.push(...parent);
    }
  }
  nuevo(variable:Variable){ /*añadir uno mas*/
    return this.push(variable);
  }
  getWithId(id:string){ /* obtener por el id*/
    return this.find(element => element.id==id);
  }
  exist(id:string){ /*ver si existe*/
    return this.some(element => element.id=id);
  }

}
