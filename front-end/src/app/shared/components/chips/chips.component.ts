import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChipsComponent implements OnInit {
  @Input() label = '';
  @Input() style: any = {};
  constructor() { }

  ngOnInit(): void {
  }

}
