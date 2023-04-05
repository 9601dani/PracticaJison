import { Component } from '@angular/core';
import {CodeModel} from "@ngstack/code-editor";
import {DefBd} from "../../parser/parserDef/DefBd";
declare var def_bd: any;
@Component({
  selector: 'app-editor-txt',
  templateUrl: './editor-txt.component.html',
  styleUrls: ['./editor-txt.component.css']
})
export class EditorTxtComponent {
  theme = 'vs-dark';
  result = '';

  codeModel: CodeModel = {
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
}
