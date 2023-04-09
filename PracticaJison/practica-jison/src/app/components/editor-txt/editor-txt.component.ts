import {Component, ViewChild} from '@angular/core';
import {CodeModel} from "@ngstack/code-editor";
import {DefBd} from "../../parser/parserDef/DefBd";
import {MyErrors} from "../../ManageError/MyErrors";
import {BaseDeDatos} from "../../objects/BaseDeDatos";
import {DBTable} from "../../objects/DBTable";

declare var def_bd: any;
@Component({
  selector: 'app-editor-txt',
  templateUrl: './editor-txt.component.html',
  styleUrls: ['./editor-txt.component.css']
})
export class EditorTxtComponent {
  codigo: string = '';
  columna!:number;
  linea!:number;
  theme = 'vs-dark';
  result = '';
  codeModel: CodeModel ={
    language: 'javascript',
    uri: 'main.js',
    value: ''
  };

  options = {
    contextmenu: true,
    minimap: {
      enabled: true
    },
    fontsize: 20
  };

  onCompile(){
    const parser = new DefBd(this.codeModel.value);
    parser.parse();
  }
  /*onCursorPositionChanged(position: EditorPosition) {
    this.linea = position.lineNumber;
    this.columna = position.column;
  }*/
  onCodeChanged(value:any) {
    this.codigo=value
   this.obtenerPosicion(this.codigo);
  }
  obtenerPosicion(codigo: string) {
    // separar el código por líneas
    this.linea= codigo.split('\n').length;
    const lineas= codigo.split('\n');
    this.columna= lineas[this.linea-1].length
  }

  protected readonly MyErrors = MyErrors;
  protected readonly BaseDeDatos = BaseDeDatos;
  protected readonly DBTable = DBTable;
}
