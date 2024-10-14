import { Component } from '@angular/core';
import { UserData } from '../../interfaces/user-data';
import { ProfileCardComponent } from '../../components/profile-card/profile-card.component';
import { initDataRaw, initData, retrieveLaunchParams } from '@telegram-apps/sdk';

const userData: UserData = {
  name: "александр",
  email: "ex@ex.com",
  phoneNumber: "+7(900) 123-45-67",
};

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ProfileCardComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent{
  userData = userData;
  initDataRaw: any;
  initData: any;


  constructor() {
    const{ initDataRaw, initData } = retrieveLaunchParams();
    this.initDataRaw = initDataRaw;
    this.initData = initData;
    console.log(initDataRaw, initData);
  }
}
