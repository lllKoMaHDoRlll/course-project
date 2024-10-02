import { Component, Input } from '@angular/core';

export const enum ColorThemes {
  PRIMARY = "primary",
  ACCEPT = "accept",
  DENY = "deny",
  NEUTRAL = "neutral",
  SECONDARY = "secondary"
}

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() colorTheme: ColorThemes = ColorThemes.PRIMARY;
}
