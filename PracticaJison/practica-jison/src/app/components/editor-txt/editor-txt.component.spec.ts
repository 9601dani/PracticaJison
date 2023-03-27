import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorTxtComponent } from './editor-txt.component';

describe('EditorTxtComponent', () => {
  let component: EditorTxtComponent;
  let fixture: ComponentFixture<EditorTxtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorTxtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorTxtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
