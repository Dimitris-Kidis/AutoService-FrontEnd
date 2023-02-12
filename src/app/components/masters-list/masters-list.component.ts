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

}