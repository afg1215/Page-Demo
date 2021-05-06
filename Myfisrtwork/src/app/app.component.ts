import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { ApiService } from './api.service';

//Model
interface ResData {
  question: string;
  options: string[];
  answer: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

  constructor(
    private apiService: ApiService //在class載入時，呼叫建構式跟他說我會用到dataService
  ) { }
  arrBirds: ResData[];
  title = 'Myfisrtwork';
  question = [];
  options = [];
  answer = [];
  btnans = [];
  index = 0;
  maxlength = 0;
  ngOnInit() {
    this.apiService.getData().subscribe(res => {
      this.arrBirds = res as ResData[];
      this.maxlength = this.arrBirds.length
      this.arrBirds.forEach(element => {
        this.question.push(element.question)
        this.options.push(element.options)
        this.answer.push(element.answer)
      })
    })
  }
  //選擇btn
  clickFunction(btnvalue, Selectvalue) {
    if (this.btnans[Selectvalue] !== undefined) {
      for (let i = 0; i < this.btnans.length; i++) {
        this.btnans[Selectvalue] = btnvalue;
      }
    } else {
      this.btnans.push(btnvalue)

    }
    this.index++;
    if (this.index === this.maxlength) {
      // console.log('到達陣列長度')
      alert("已經做答完畢了")
      this.index === 0;
    }
  }

  //交卷
  clickans() {
    //做答
    console.log("作:" + this.btnans)
    //解答
    console.log("解:" + this.answer)
    //結果
    let OK = 0;
    let ERROR = 0;
    if (this.answer.length !== this.btnans.length) {
      return false;
    }
    for (let i = 0; i < this.answer.length; i++) {
      if (this.answer[i] !== this.btnans[i]) {
        ERROR++;
      }
      else {
        OK++;
      }
    }
    alert("答對題數:" + OK + ",錯誤題數:" + ERROR)
  }

  //切換btn
  ChangFun(Selectvalue) {
    //切換題目index
    this.index = Selectvalue;
  }
}

