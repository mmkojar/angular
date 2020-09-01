import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../blogpost.service';
import { Blogpost } from '../blogpost';
import { SharedataService } from '../../sharedata.service';

@Component({
  selector: 'app-blogpost-featured',
  templateUrl: './blogpost-featured.component.html',
  styleUrls: ['./blogpost-featured.component.css']
})
export class BlogpostFeaturedComponent implements OnInit {

  blogs: Blogpost;
  error: {};

  constructor(private blogpostService: BlogpostService,
    private sharedataService: SharedataService) { }

  ngOnInit() {
    this.sharedataService.loader = true;
    this.blogpostService.getFeaturedPosts().subscribe(
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
