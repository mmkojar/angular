import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BlogpostService } from '../blogpost.service';
import { Blogpost } from '../blogpost';
import { SharedataService } from '../../sharedata.service';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-blogpost-detail',
  templateUrl: './blogpost-detail.component.html',
  styleUrls: ['./blogpost-detail.component.css']
})
export class BlogpostDetailComponent implements OnInit {

  blogs: Observable<Blogpost>;
  error: {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private blogpostService: BlogpostService,
    private sharedataService: SharedataService
  ) { }

  ngOnInit() {
    this.sharedataService.loader = true;
    this.titleService.setTitle('Blog Detail');
    let id = this.route.snapshot.params.id;
    let cat_id = this.route.snapshot.params.cat_id;

    if (cat_id) {
      this.route.paramMap.pipe(
        switchMap((params: ParamMap) =>
          this.blogpostService.getPost(+params.get('id'), +params.get('cat_id'))
        )
      ).subscribe(data => {
        this.sharedataService.loader = false;
        this.blogs = data.data
      })
    }
    else {
      this.route.paramMap.pipe(
        switchMap((params: ParamMap) =>
          this.blogpostService.getPost(+params.get('id'))
        )
      ).subscribe(data => {
        this.sharedataService.loader = false;
        this.blogs = data.data
      })
    }

    // this.blogs = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) =>
    //     this.blogpostService.getPost(+params.get('id')),
    //   )
    // );
  }

}
