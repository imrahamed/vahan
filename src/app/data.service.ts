import { Injectable } from '@angular/core';
import { Observable, Observer, fromEvent, merge, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSource = new BehaviorSubject<Array<any>>([]);
  data = this.dataSource.asObservable();
  constructor(private message: NzMessageService, private http: HttpClient) {
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
      const wrapper = document.getElementsByClassName('ant-tabs-content') && document.getElementsByClassName('ant-tabs-content')[0];
      if (wrapper) {
        wrapper.scrollTo
          (0, wrapper.scrollHeight);
      }
    }, 500);
  }
  /**
   *
   * @param entry new value for msgList
   * function to update msg list
   */
  changeData(entry: any) {
    this.dataSource.next(entry);
    localStorage.setItem('msgList', JSON.stringify(entry));
    this.scrollToBottom();
  }
  /**
   * 
   * @param content msg content
   * @param type type of the msg
   */
  addMsg(content: string, type: string) {
    const currentMsg = this.dataSource.getValue();
    currentMsg.push({ content, type });
    this.changeData(currentMsg);
    if (type === 'sent') {
      this.getResponse().then(({msg, msgType}) =>{
        this.addMsg(msg, msgType);
      }).catch(err => console.error(err));
    }
  }

  getResponse() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.api_url).subscribe((response) => {
        console.log(response);
        resolve(response);
      },
        (error) => {
          reject(error);
        }
      );
    });
  }

}
