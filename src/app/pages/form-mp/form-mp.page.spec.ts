import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormMpPage } from './form-mp.page';

describe('FormMpPage', () => {
  let component: FormMpPage;
  let fixture: ComponentFixture<FormMpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormMpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormMpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
