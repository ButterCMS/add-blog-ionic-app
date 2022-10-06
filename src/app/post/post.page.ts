import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CmsService } from '../services/cms.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  slug: string;
  post: Record<string, unknown>;
  busy = false;
  subscription: Subscription;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly cms: CmsService,
    private readonly toast: ToastController,
    private readonly navCtrl: NavController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe({
      next: (params) => {
        this.slug = params.get('slug');
      },
    });
  }

  ionViewWillEnter() {
    if (this.slug) {
      this.busy = true;
      this.fetchPostInformation();
    }
  }

  ionViewDidLeave() {
    this.subscription?.unsubscribe();
  }

  navigateBack() {
    this.navCtrl.back();
  }

  fetchPostInformation() {
    this.subscription = this.cms.getSinglePost(this.slug).subscribe({
      next: (response) => {
        this.post = response.data;
        this.busy = false;
      },
      error: () => {
        this.busy = false;
        this.showErrorToast();
      },
    });
  }

  async showErrorToast() {
    const toast = await this.toast.create({
      message: 'Something went wrong. Please try again.',
      color: 'light',
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel',
        },
      ],
    });
    toast.present();
  }
}
