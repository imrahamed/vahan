import { Injectable } from '@angular/core';
import { Observable, Observer, fromEvent, merge, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSource = new BehaviorSubject<Array<any>>([]);
  data = this.dataSource.asObservable();
  constructor(private message: NzMessageService) {
  }
  /**
   * Function to check internet status
   * and emit it to app.component
   */
  createOnline$() {
    return merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      }));
  }

  /**
   * After every msg container should get scrolled to bottom,
   * so the user can view new message easily
   */
  scrollToBottom() {
    setTimeout(() => {
      document.getElementsByClassName('ant-tabs-content')[0].scrollTo
      (0, document.getElementsByClassName('ant-tabs-content')[0].scrollHeight);
    }, 1000);
  }
/**
 * 
 * @param entry new value for msgList
 * function to update msg list
 */
  changeData(entry: any) {
    this.dataSource.next(entry);
    localStorage.setItem('msgList', JSON.stringify(entry));
  }
  /**
   * 
   * @param content msg content
   * @param type type of the msg
   */
  addMsg(content: string, type: string) {
    const currentMsg = this.dataSource.getValue();
    currentMsg.push({content, type});
    this.changeData(currentMsg);
    if (type === 'sent') {
      setTimeout(() => {
        this.addMsg('Pardon my ignorance. I am just a dummy.', 'received');
      }, 1000);
    }
    this.scrollToBottom();
  }

}
