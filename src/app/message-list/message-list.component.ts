import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  msgList: any[];

  constructor(private dataService: DataService) {
    // subscribing msglist from service
    this.dataService.data.subscribe(result => {
      this.msgList = result;
    });
  }

  ngOnInit() {
  }

}
