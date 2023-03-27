import { Component } from '@angular/core';
import {CodeModel} from "@ngstack/code-editor";

@Component({
  selector: 'app-editor-txt',
  templateUrl: './editor-txt.component.html',
  styleUrls: ['./editor-txt.component.css']
})
export class EditorTxtComponent {
  theme = 'vs-dark';

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
    console.log(this.codeModel.value);
  }
}
