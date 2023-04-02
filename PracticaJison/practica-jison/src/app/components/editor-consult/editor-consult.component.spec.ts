import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorConsultComponent } from './editor-consult.component';

describe('EditorConsultComponent', () => {
  let component: EditorConsultComponent;
  let fixture: ComponentFixture<EditorConsultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorConsultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
