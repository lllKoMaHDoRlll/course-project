import { Component, Input } from '@angular/core';
import { UserData } from '../user-data';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent {
 @Input({required: true}) userData: UserData | undefined;
}
