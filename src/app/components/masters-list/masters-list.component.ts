import { AfterContentChecked, AfterContentInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MasterListItem } from 'src/models/Masters/MasterListItem';
import { MasterReview } from 'src/models/Masters/MasterReview';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-masters-list',
  templateUrl: './masters-list.component.html',
  styleUrls: ['./masters-list.component.scss']
})
export class MastersListComponent implements OnInit {

  constructor(
    private _commonService: CommonService
  ) {}

  masters!: MasterListItem[];

  reviewList: boolean = true;

  ngOnInit(): void {
    this._commonService.getAllMasters().subscribe(
      (masters: MasterListItem[]) => {
        this.masters = masters;
      }
    );
  }


  reviews: MasterReview[] = [];

  getReviews(id: number) {
    this._commonService.getAllMasterReviews(id).subscribe(
      (reviews: MasterReview[]) => {
        this.reviews = reviews;
        console.log(reviews);
      }
    );
    this.reviewList = false;
    console.log(id);
  }

  getBack() {
    this.reviewList = true;
  }


  // @ViewChild('button') button: ElementRef;
  // go () {
  //   if (!this.button) return
  //   var doneTimeout: any = null;
	// 	var resetTimeout:any  = null;
 
  //         const runClass = "btn--running";
  //         const doneClass = "btn--done";
  //         // `.btn--running .btn__progress-fill` `stroke-dashoffset` duration in ms
  //         const submitDuration = 2000;
  //         const resetDuration = 1500;
    
  //         // fake the submission
  //         this.button.nativeElement.disabled = true;
  //         this.button.nativeElement.classList.add(runClass);
    
  //         clearTimeout(doneTimeout);
  //         clearTimeout(resetTimeout);
    
  //         doneTimeout = setTimeout(() => {
  //           this.button.nativeElement.classList.remove(runClass);
  //           this.button.nativeElement.classList.add(doneClass);
            
  //           // reset the button
  //           resetTimeout = setTimeout(() => {
  //             this.button.nativeElement.disabled = false;
  //             this.button.nativeElement.classList.remove(doneClass);
  //           }, resetDuration);
    
  //         }, 600 + submitDuration);
        
      
  //   }
    
}

