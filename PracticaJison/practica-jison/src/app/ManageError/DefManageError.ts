export class DefManageError{
  linea!:number;
  columna!:number;
  type_error!:String;
  descripcion!:String;

  constructor(linea:number,columna:number,type_error:String,descripcion:String) {
      this.linea=linea;
      this.columna=columna;
      this.type_error=type_error;
      this.descripcion=descripcion;
  }
}
