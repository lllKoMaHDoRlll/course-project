import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-loading-for',
  standalone: true,
  imports: [CommonModule, LoadingComponent],
  templateUrl: './loading-for.component.html',
  styleUrl: './loading-for.component.scss'
})
export class LoadingForComponent {
  @Input({required: true}) loadingForValue!: any;
}
