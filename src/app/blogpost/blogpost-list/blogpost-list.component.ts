import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../blogpost.service';
import { Blogpost } from '../blogpost';
import { Title } from '@angular/platform-browser';
import { SharedataService } from '../../sharedata.service';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent implements OnInit {

  constructor(
    private titleService: Title,
    private blogpostService: BlogpostService,
    private sharedataService: SharedataService
  ) { }


  title = 'Blogs';
  blogs: Blogpost;
  error: {};
  // this.sharedataService.showLoader;

  ngOnInit() {
    this.sharedataService.loader = true;
    this.titleService.setTitle(this.title);

    this.blogpostService.getPosts().subscribe(
      (data: Blogpost) => {
        if (data.status == 'success') {
          this.sharedataService.loader = false;
          this.blogs = data.data
        }
      },
      error => this.error = error,
    );
  }

}
