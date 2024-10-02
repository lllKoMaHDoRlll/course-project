import { Component, Input } from '@angular/core';

export type ColorThemes =
  "primary" |
  "accept"  |
  "deny"    |
  "neutral" |
  "secondary"
;

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() colorTheme: ColorThemes = "primary";
}
