import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormMp4Page } from './form-mp4.page';

describe('FormMp4Page', () => {
  let component: FormMp4Page;
  let fixture: ComponentFixture<FormMp4Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormMp4Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormMp4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
