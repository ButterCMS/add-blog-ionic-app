import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CmsService } from '../services/cms.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  posts$ = new BehaviorSubject([]);
  subscription: Subscription;

  constructor(
    private readonly cms: CmsService,
    private readonly router: Router
  ) {}

  ionViewWillLeave() {
    this.subscription?.unsubscribe();
  }

  search(event: CustomEvent<{ value?: string }>) {
    if (event.detail?.value?.length < 1) {
      this.posts$.next([]);
      return;
    }
    this.cms.searchByKeyword(event.detail.value).subscribe({
      next: (response) => {
        this.posts$.next(response.data);
      },
    });
  }

  viewPost(slug: string) {
    this.router.navigate(['/post', slug]);
  }
}
