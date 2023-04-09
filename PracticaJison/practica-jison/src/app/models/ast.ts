import {Instruction} from "./instruction";

export class Ast{
  private static instancia: Ast;
  arbol_ast!: Instruction[];

  constructor() {
    this.arbol_ast=[]
  }
  public static getInstancia(): Ast {
    if (!Ast.instancia) {
      Ast.instancia = new Ast();
    }
    return Ast.instancia;
  }

}
