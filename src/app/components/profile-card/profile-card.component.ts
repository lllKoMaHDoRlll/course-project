
import { Component, Input, OnInit } from '@angular/core';
import { UserData } from '../../interfaces/user-data';
import { TonConnectButtonComponent } from '../ton-connect-button/ton-connect-button.component';
import { exercisesService } from '../../services/database/exercises.service';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [TonConnectButtonComponent],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent implements OnInit {
 @Input({required: true}) userId!: number;
 @Input({required: true}) username!: string;
 profilePictureHref: string | undefined;

 async ngOnInit() {
  this.profilePictureHref = await exercisesService.getUserProfilePicture(this.userId);

 }
}
