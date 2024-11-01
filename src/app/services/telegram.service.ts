import { backButton, EventListener, init, viewport, swipeBehavior, retrieveLaunchParams, LaunchParams, miniApp, RGB, popup, PopupButton } from '@telegram-apps/sdk';
import { Injectable } from '@angular/core';
import { Achievement } from '../interfaces/achievements';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class TelegramService{
  private viewport = viewport;
  private swipeBehavior = swipeBehavior;
  private backButton = backButton;
  private miniApp = miniApp;
  private popup = popup;
  launchParams: LaunchParams | undefined;
  isInited: boolean = false;

  constructor(private router: Router) { }

  async init() {
    init();
    this.launchParams = retrieveLaunchParams();
    await this.viewport.mount();
    if (this.swipeBehavior.isSupported()) this.swipeBehavior.mount();
    if (this.backButton.isSupported()) this.backButton.mount();
    miniApp.mount();
    this.isInited = true;
  }

  getUserTGId(): number | undefined {
    return this.launchParams?.initData?.user?.id;
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

  showPopup(title: string, message: string, buttons: PopupButton[]): Promise<string | null> {
    return this.popup.open({
      title: title,
      message: message,
      buttons: buttons
    });
  }

  async showAchievementsClaimPopup(completed_achievements: Achievement[]) {
    if (completed_achievements.length > 0) {
      let message;
      if (completed_achievements.length > 1) {
        message = "Вы выполнили следующие достижения:\n"
        for (let i = 0; i < completed_achievements.length; i++) {
          message += `${i + 1}. ${completed_achievements[i].name}\n`
        }
        message += "Получить SBT Вы можете на странице достижений."
      }
      else {
        message = `Вы выполнили достижение: ${completed_achievements[0].name}\nПолучить SBT Вы можете на странице достижений.`
      }
      const buttons: PopupButton[] = [
        {
          id: "goto",
          type: "default",
          text: "Перейти"
        },
        {
          id: "close",
          type: "close"
        }
      ]
      const userAction = await this.showPopup("Поздравляем!", message, buttons);
      if (userAction == "goto") {
        this.router.navigate(["achievements"]);
      }
    }
  }
}
