import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CmspageService } from '../cmspage.service';
import { Page } from '../page';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  pages: Page;
  error: {};

  constructor(
    private route: ActivatedRoute,
    private cmspageService: CmspageService
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.cmspageService.getPages(params.get('slug'))
      )
    ).subscribe(
      (data: Page) => this.pages = data.data,
      error => this.error = error
    );
  }

}
