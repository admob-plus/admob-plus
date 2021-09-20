import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { AdMob, BannerAd } from "@admob-plus/ionic/ngx";
import { Observable } from "rxjs";
import "rxjs/add/observable/fromEvent";

// @ts-ignore
const { fromEvent } = Observable;

@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage {
  banner: BannerAd;

  constructor(public navCtrl: NavController, private admob: AdMob) {
    fromEvent(document, "admob.ad.load").subscribe((event) => {
      console.log("banner loaded: ", event);
    });
  }

  async showBannerAd() {
    const banner = new this.admob.BannerAd({
      adUnitId: "ca-app-pub-3940256099942544/6300978111",
    });
    banner.on("load", (event) => {
      console.log("banner loaded", event);
    });
    this.banner = banner;
    await banner.show();
  }

  async hideBannerAd() {
    if (!this.banner) return;
    await this.banner.hide();
  }
}
