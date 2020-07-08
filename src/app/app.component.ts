import { Component } from '@angular/core';
import { DataService } from './data.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tabs = [
    {
      active: true,
      name: 'Chat',
      icon: 'message'
    },
    {
      active: false,
      name: 'My Jobs',
      icon: 'idcard'
    },
    {
      active: false,
      name: 'Profile',
      icon: 'user'
    },
    {
      active: false,
      name: 'Learn',
      icon: 'laptop'
    }
  ];
  constructor(private dataService: DataService, private message: NzMessageService) {
    // Internet status Check
    this.dataService.createOnline$().subscribe(isOnline => {
      if (isOnline) {
        this.message.create('success', `Welcome Back`);
      } else {
        this.message.create('error', `You are offline`);
      }
    });

    // updating msg list, if msglist presents in localstorage
    // this allows us to maintain msgs even after refresh.
    const msgList = localStorage.getItem('msgList');
    if (msgList) {
      this.dataService.changeData(JSON.parse(msgList));
    }
  }
}
