import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/core/services/loader.service';
import { Subject } from 'rxjs'

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  constructor(private _LoaderService: LoaderService) { }

  isLoading: Subject<boolean> = this._LoaderService.isLoading

  ngOnInit(): void {
  }

}
