import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Form2MpPage } from './form2-mp.page';

describe('Form2MpPage', () => {
  let component: Form2MpPage;
  let fixture: ComponentFixture<Form2MpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Form2MpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Form2MpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
