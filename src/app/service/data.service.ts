import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  constructor() {}

  options: object[] = [
    { name: 'ali', id: 1 },
    { name: 'reza', id: 2 },
    { name: 'kate', id: 3 },
    { name: 'john', id: 4 },
    { name: 'jack', id: 5 },
    { name: 'sarah', id: 6 },
    { name: 'ben', id: 7 },
    { name: 'jack', id: 8 },
    { name: 'leonard', id: 9 },
    { name: 'john', id: 10 },
    { name: 'jack', id: 11 },
    { name: 'sarah', id: 12 },
    { name: 'ben', id: 13 },
    { name: 'jack', id: 14 },
  ];

  formOptionData = new BehaviorSubject(this.options);

  appendData(): Observable<any[]> {
    let array: object[] = [
    { name: "leonard", id: 15},
    { name: "john", id: 16},
    { name: "jack", id: 17},
    { name: "sarah", id: 17},
    { name: "ben", id: 18},
    { name: "jack", id: 19},
    { name: "leonard", id: 20},];

    return of(array);
  }


  // if there was a backend api

  // getAppendDataFromHttp() {
    // this.http.get<any>(this.apiUrl + Url,_data);
    // return this.getRequest('Story', storyModel).subscribe({
    //   next: (value) =>
    //     return of(value);
    //   error: () => {
    //     this.toastr.error(
    //       'there was an error from server'
    //     );
    //   },
    // });
  // }
}
