import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faR, faRotate } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [FontAwesomeModule, ],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {
  faRotate = faRotate;
}
