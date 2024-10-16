import { Component, OnInit } from '@angular/core';
import { UserData } from '../../interfaces/user-data';
import { ProfileCardComponent } from '../../components/profile-card/profile-card.component';
import { initDataRaw, initData, retrieveLaunchParams } from '@telegram-apps/sdk';
import { LoadingForComponent } from '../../components/loading-for/loading-for.component';

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

  constructor() {
    const{ initDataRaw, initData } = retrieveLaunchParams();
    this.userId = initData?.user?.id!;
    this.username = initData?.user?.username!;
    console.log(initDataRaw, initData);
  }
}
