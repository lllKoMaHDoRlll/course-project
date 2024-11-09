import { Component, inject } from '@angular/core';
import { ProfileCardComponent } from '../../components/profile-card/profile-card.component';
import { LoadingForComponent } from '../../components/loading-for/loading-for.component';
import { TelegramService } from '../../services/telegram.service';


@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ProfileCardComponent, LoadingForComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent{
  userId: number;
  username: string;

  constructor(private telegram: TelegramService) {
    this.telegram.showBackButton();
    this.userId = this.telegram.launchParams?.initData?.user?.id!;
    this.username = this.telegram.launchParams?.initData?.user?.username!;
  }
}
