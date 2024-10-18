import { backButton, EventListener, init, viewport, swipeBehavior, retrieveLaunchParams, LaunchParams, miniApp, RGB } from '@telegram-apps/sdk';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TelegramService{
  private viewport = viewport;
  private swipeBehavior = swipeBehavior;
  private backButton = backButton;
  private miniApp = miniApp;
  launchParams: LaunchParams | undefined;

  constructor() { }

  async init() {
    init();
    this.launchParams = retrieveLaunchParams();
    await this.viewport.mount();
    if (this.swipeBehavior.isSupported()) this.swipeBehavior.mount();
    if (this.backButton.isSupported()) this.backButton.mount();
    miniApp.mount();
  }

  expand() {
    if (this.viewport.isMounted() && this.viewport.isExpanded() == false) this.viewport.expand();
  }

  disableVerticalScroll() {
    if (this.swipeBehavior.isMounted() && this.swipeBehavior.isVerticalEnabled()) this.swipeBehavior.disableVertical();
  }

  enableVerticalScroll() {
    if (this.swipeBehavior.isMounted() && this.swipeBehavior.isVerticalEnabled() == false) this.swipeBehavior.enableVertical();
  }

  showBackButton() {
    if (this.backButton.isMounted() && this.backButton.isVisible() == false) this.backButton.show();
  }

  hideBackButton() {
    if (this.backButton.isMounted() && this.backButton.isVisible()) this.backButton.hide();
  }

  onBackButtonClick(fn: EventListener<"back_button_pressed">) {
    if (this.backButton.isMounted()) this.backButton.onClick(fn);
  }

  setHeaderColor(color: RGB) {
    if (miniApp.setHeaderColor.isSupported() && miniApp.setHeaderColor.supports("color")) {
      miniApp.setHeaderColor(color);
    }
  }
}
