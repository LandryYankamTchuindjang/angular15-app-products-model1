import { Component, OnInit } from '@angular/core';
import { EventDriverSevice } from 'src/app/states/event.driver.service';
import { ActionEvent } from 'src/app/states/product.state';

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.css']
})
export class StatesComponent implements OnInit {

  counter:number=0;
  constructor(private eventDrivenService:EventDriverSevice){}

  ngOnInit(): void {
    this.eventDrivenService.sourceEventSujectObservable.subscribe((actionEvent:ActionEvent)=>{
      ++this.counter;
    });
  }

}
