import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-composer',
  templateUrl: './composer.component.html',
  styleUrls: ['./composer.component.css']
})
export class ComposerComponent implements OnInit {
  newMsg: string;
  constructor(private dataService: DataService) {
  }

  ngOnInit() {
  }
  /**
   * function to add new message
   */
  addMsg() {
    this.newMsg = this.newMsg.trim();
    if (this.newMsg && this.newMsg.length) {
      this.dataService.addMsg(this.newMsg, 'sent');
      this.newMsg = '';
    }
  }
  handleChange() {

  }

}
