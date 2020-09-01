import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedataService } from './sharedata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public router: Router, public sharedataService: SharedataService) { }

  // loader: boolean;

  ngOnInit() {
    // this.sharedataService.loader = this.loader;
  }
}
