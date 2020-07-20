import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormMp3Page } from './form-mp3.page';
import { ReactiveFormsModule } from '@angular/forms';

describe('FormMp3Page', () => {
  let component: FormMp3Page;
  let fixture: ComponentFixture<FormMp3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormMp3Page ],
      imports: [IonicModule.forRoot(),
                ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FormMp3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
