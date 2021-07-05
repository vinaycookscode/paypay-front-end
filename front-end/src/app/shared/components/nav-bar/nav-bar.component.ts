import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isUserLoggedIn = false;
  constructor(
    public sharedService: SharedService,
  ) {
    this.isUserLoggedIn = localStorage.getItem('token') ? true : false;
  }

  ngOnInit(): void {
  }

}
