import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DataService } from './service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  myControl = new FormControl([''], [Validators.required]);
  options: object[] = [];

  cardValue: any = {
    options: [],
  };

  constructor(private dataSrv: DataService) {}

  ngOnInit() {
    this.dataSrv.formOptionData.subscribe(response => {
      this.options = response;
    })
  }

  getData() {
    this.dataSrv.appendData().subscribe((res) => {
      this.options = res;
    });
  }

  selectChange = (event: any) => {
    console.log(event);
    const key: string = event.key;
    this.cardValue[key] = [...event.data];
  };
}
