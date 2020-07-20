import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormMp2Page } from './form-mp2.page';

describe('FormMp2Page', () => {
  let component: FormMp2Page;
  let fixture: ComponentFixture<FormMp2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormMp2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormMp2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
