import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ItemData } from '../core/interfaces/selection.interface';

@Component({
  selector: 'multiselect-autocomplete',
  templateUrl: './multi-select-auto-complete.component.html',
  styleUrls: ['./multi-select-auto-complete.component.css'],
})
export class MultiSelectAutoCompleteComponent implements OnInit {
  @Output() result = new EventEmitter<{ data: Array<object> }>();
  @Output() appendData = new EventEmitter();
  @Input() placeholder: string = 'Select Data';
  @Input() required: boolean = false;
  @Input() data: Array<any> = [];
  @Input() key: string = '';
  selectControl = new FormControl();
  rawData: Array<ItemData> = [];
  selectData: Array<ItemData> = [];
  filteredData!: Observable<Array<ItemData>>;
  filterString: string = '';
  checkValidaiotn: boolean = false;

  constructor() {
    this.initSearchField();
  }

  ngOnInit(): void {
    this.data.forEach((key: any) => {
      this.rawData.push({ key: key.name, value: key.id ,selected: false });
    });
  }

  initSearchField() {
    this.filteredData = this.selectControl.valueChanges.pipe(
      startWith<string>(''),
      map((value) => (typeof value === 'string' ? value : this.filterString)),
      map((filter) => this.filter(filter))
    );
  }

  filter = (filter: string): Array<ItemData> => {
    this.filterString = filter;
    if (filter.length > 0) {
      return this.rawData.filter((option) => {
        return option.key.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
      });
    } else {
      return this.rawData.slice();
    }
  };

  optionClicked = (event: Event, data: ItemData): void => {
    event.stopPropagation();
    this.toggleSelection(data);
  };

  toggleSelection = (data: ItemData): void => {
    data.selected = !data.selected;
    if (data.selected === true) {
      this.selectData.push(data);
    } else {
      const i = this.selectData.findIndex((value) => value.key === data.key);
      this.selectData.splice(i, 1);
    }
    this.selectControl.setValue(this.selectData);
    this.emitAdjustedData();
  };

  checkValidation() {
    if(this.selectData.length == 0) {
      this.checkValidaiotn = true;
    } else {
      this.checkValidaiotn = false;
    }
  }

  emitAdjustedData = (): void => {
    const results: Array<object> = [];
    this.selectData.forEach((data: ItemData) => {
      results.push({ key: data.key, value: data.value ,selected: false });
    });
    this.result.emit({ data: results });
  };

  onScrollButtom() {
    this.appendData.emit();
    this.data.forEach((key: any) => {
      this.rawData.push({ key: key.name,value: key.value , selected: false });
    });
    this.filteredData = of(this.rawData);
    this.initSearchField();
  }
  displayFn = (): string => '';
}
