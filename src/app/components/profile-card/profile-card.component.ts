
import { Component, Input } from '@angular/core';
import { UserData } from '../../interfaces/user-data';
import { TonConnectButtonComponent } from '../ton-connect-button/ton-connect-button.component';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [TonConnectButtonComponent],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent {
 @Input({required: true}) userData: UserData | undefined;
}
