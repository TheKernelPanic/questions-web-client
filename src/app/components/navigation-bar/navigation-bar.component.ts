import {Component, Inject, OnInit} from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  public constructor(
    @Inject('APP_VERSION') public appVersion: string
  ) { }

  public ngOnInit(): void {
  }
}
