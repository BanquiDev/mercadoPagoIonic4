import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DataCuotasComponent } from './data-cuotas.component';

describe('DataCuotasComponent', () => {
  let component: DataCuotasComponent;
  let fixture: ComponentFixture<DataCuotasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataCuotasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DataCuotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
