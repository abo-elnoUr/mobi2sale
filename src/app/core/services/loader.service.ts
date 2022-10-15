import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  isLoading = new Subject<boolean>();

  constructor() {
  }

  showLoader(value: boolean) {
    this.isLoading.next(value);
  }
  getLoading(): Observable<boolean> {
    return this.isLoading.asObservable();
  }

}
