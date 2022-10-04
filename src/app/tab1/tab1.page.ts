import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CmsService } from '../services/cms.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit, OnDestroy {
  subscription: Subscription;
  posts$ = new BehaviorSubject([]);
  busy = true;
  // pagination can be implemented using the following properties
  currentPage = 1;
  totalPages: number;

  constructor(private readonly cms: CmsService) {}

  ngOnInit() {
    this.subscription = this.cms.getAllPosts(this.currentPage).subscribe({
      next: ({ meta, data }) => {
        // meta contains pagination information
        this.busy = false;
        this.posts$.next(data);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
