import { DatabaseService } from './../../services/database/database.service';
import { Component, inject, Input, OnInit } from '@angular/core';
import { UserData } from '../../interfaces/user-data';
import { TonConnectButtonComponent } from '../ton-connect-button/ton-connect-button.component';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [TonConnectButtonComponent],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent implements OnInit {
  database = inject(DatabaseService);
  @Input({required: true}) userId!: number;
  @Input({required: true}) username!: string;
  profilePictureHref: string | undefined;

  async ngOnInit() {
    this.profilePictureHref = await this.database.getUserProfilePicture(this.userId);
  }
}
