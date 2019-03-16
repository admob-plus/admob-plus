import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { AdMob } from "ionic-admob";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  constructor(public navCtrl: NavController, public admob: AdMob) {}

  banner__show() {
    this.admob.banner.show({ id: "test" });
  }

  banner__hide() {
    this.admob.banner.hide("test");
  }

  interstitial__load() {
    this.admob.interstitial.load({ id: "test" });
  }

  interstitial__show() {
    this.admob.interstitial.show();
  }

  reward_video__load() {
    this.admob.rewardVideo.load({ id: "test" });
  }

  reward_video__show() {
    this.admob.rewardVideo.show();
  }
}
