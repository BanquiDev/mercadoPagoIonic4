import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormJsPage } from './form-js.page';

describe('FormJsPage', () => {
  let component: FormJsPage;
  let fixture: ComponentFixture<FormJsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormJsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormJsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
