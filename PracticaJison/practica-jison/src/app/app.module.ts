import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorTxtComponent } from './components/editor-txt/editor-txt.component';
import { CodeEditorModule} from "@ngstack/code-editor";

@NgModule({
  declarations: [
    AppComponent,
    EditorTxtComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CodeEditorModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
