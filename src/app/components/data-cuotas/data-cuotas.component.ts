import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-data-cuotas',
  templateUrl: './data-cuotas.component.html',
  styleUrls: ['./data-cuotas.component.scss'],
})
export class DataCuotasComponent implements OnInit {
  @Input()installmentOptions
  constructor() { }

  ngOnInit() {
    console.log(this.installmentOptions)
  }

}
