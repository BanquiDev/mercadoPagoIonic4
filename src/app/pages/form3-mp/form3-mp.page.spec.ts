import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Form3MpPage } from './form3-mp.page';

describe('Form3MpPage', () => {
  let component: Form3MpPage;
  let fixture: ComponentFixture<Form3MpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Form3MpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Form3MpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
