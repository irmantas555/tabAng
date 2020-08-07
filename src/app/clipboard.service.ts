import { Injectable } from '@angular/core';
import { ClipboardModule, Clipboard } from '@angular/cdk/clipboard';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClipboardService {
  cdata: string = '';
  ccontent = new Subject<string>();
 

  constructor(private clipboard: Clipboard) {}

  pCContent() {
    navigator.clipboard.readText().then((res)=>{
      this.cdata = res
    })
    console.log(this.cdata)
    this.ccontent.next(this.cdata)
}




}
