import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import tonConnectService from '../../services/ton-connect.service';


@Component({
  selector: 'app-ton-connect-button',
  standalone: true,
  imports: [],
  templateUrl: './ton-connect-button.component.html',
  styleUrl: './ton-connect-button.component.scss'
})
export class TonConnectButtonComponent implements AfterViewInit, OnDestroy{
  ngAfterViewInit(): void {
    console.log(tonConnectService.tonConnectUI);
    tonConnectService.tonConnectUI.uiOptions = {buttonRootId: "ton-connect"};
  }

  ngOnDestroy(): void {
    tonConnectService.tonConnectUI.uiOptions = {buttonRootId: null};
  }
}
