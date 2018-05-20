import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {TimerObservable} from 'rxjs/observable/TimerObservable';


// rxjs 5
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import * as Rx from 'rxjs/Rx';
import {text} from '@angular/core/src/render3/instructions';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private tick: number;
  private subscription: Subscription;
  public timer;
  public date;
  public valueTick;

  constructor() {
    this.date = new Date;
  }

  ngOnInit() {}


  timerStart() {
    this.timer = TimerObservable.create(2000, 1000);
    this.subscription = this.timer.subscribe(t => {
      console.log(t);
      this.tick = t;
      this.valueTick = this.tick;
      console.log('this is valueTick ' + this.valueTick );
    });

  }

  timerStop() {
    this.subscription.unsubscribe();
  }

  timerResetAndStop() {
    this.timerStop();
    this.tick = 0;

  }
  timerResetAndGo() {
    this.subscription.unsubscribe();
    this.timerStart();
  }



  timerWait() {
    setTimeout(this.timerStop(), 5000);
  }


  timeMask(value: number): string {
    const houres: number = Math.floor(value / 360);
    const minutes: number = Math.floor(value / 60);
    const second: number = Math.floor(value - minutes * 60);

   let h = (houres < 10) ? '0' + houres : houres;
   let m = (minutes < 10) ? '0' + minutes : minutes;
   let s = (second < 10) ? '0' + second : second;

    return h + ':' + m + ':' + s;
  }



  timerDontWait() {
let button = document.querySelector('.double-click');
    let text = document.querySelector('.message');

    let clicks$ = TimerObservable
      .dispatch(this.valueTick)
      .fromEvent(button, 'click');

    clicks$.subscribe( _ => console.log('click'));

    let doubleClicks$ = clicks$
      .buffer( _ => clicks$.debounce(300))
      .map(clicksWithin300ms => clicksWithin300ms.length)
      .filter(clicksWithin300ms => clicksWithin300ms === 2);

    doubleClicks$.subscribe(e => {
      console.log('double click');
    });

    doubleClicks$
      .debounce(1000)
      .subscribe( _ => {
        console.log('reset')
      });
  }

/*  ttt() {
    console.log('this is valueTick from ttt() ' + this.valueTick );
    console.log(this.timer);
    console.log(this.subscription);

  }*/

}
