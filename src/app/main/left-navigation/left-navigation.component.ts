import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'left-navigation',
  templateUrl: './left-navigation.component.html',
  styleUrls: ['./left-navigation.component.scss']
})
export class LeftNavigationComponent implements OnInit {
  public isCollapsed = true;
  constructor() { }

  ngOnInit(): void {
  }

}

