import { Component, Input } from '@angular/core';
import { UserData } from '../user-data';
import { ProfileCardComponent } from '../profile-card/profile-card.component';


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
export class ProfilePageComponent {
  userData = userData;
}
