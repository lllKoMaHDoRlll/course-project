import { Component, Input } from '@angular/core';

export type ColorThemes =
  "primary"   |
  "accept"    |
  "deny"      |
  "neutral"   |
  "secondary" |
  "attention"
;

export type Sizes =
  "large"  |
  "normal" |
  "small"
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
  @Input() size: Sizes = "normal"
}
