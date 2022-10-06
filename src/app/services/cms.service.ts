import { Injectable } from '@angular/core';
import Butter from 'buttercms';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const extractData = map((data: Butter.Response) => data.data);

@Injectable({
  providedIn: 'root',
})
export class CmsService {
  private butterClient = Butter(environment.butterApiKey);
  constructor() {}

  public getAllPosts(page = 1, page_size = 10) {
    return from(
      this.butterClient.post.list({ page, page_size, exclude_body: true })
    ).pipe(extractData);
  }

  public getSinglePost(slug: string) {
    return from(this.butterClient.post.retrieve(slug)).pipe(extractData);
  }

  public searchByKeyword(query: string, page = 1, page_size = 10) {
    return from(
      this.butterClient.post.search(query, {
        page,
        page_size,
        exclude_body: true,
      })
    ).pipe(extractData);
  }
}
