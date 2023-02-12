import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

declare const ymaps: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  map: any;
  @ViewChild('yamaps')
  el!: ElementRef;

  ngOnInit(): void {
    ymaps.ready().done(() => this.createMap());
  }

  private createMap(): void {
    this.map = new ymaps.Map('map', {
      center: [47.061962589389715,28.868018558532256],
      
      zoom: 19
    }, {
      searchControlProvider: 'yandex#search'

    });

    const MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                  '<div style="color: #000; border-radius: 50px; font-weight: bold;">$[properties.iconContent]</div>'
              );
    const placeMark = new ymaps.Placemark([47.061962589389715,28.868018558532256], {
      hintContent: '3 блок',
      balloonContent: 'Технический Универстите Молдовы',
      iconContent: 'UTM'
  }, {
      iconLayout: 'default#imageWithContent',
      iconImageHref: 'https://typostorage.blob.core.windows.net/avatars/34_Dmitrii+Romanenco2023-02-06T074933378.red.png',
      iconImageSize: [48, 48],
      iconImageOffset: [-20, -20],
      iconContentOffset: [25, 31],
      iconContentLayout: MyIconContentLayout
  });
    this.map.geoObjects.add(placeMark);
  }


}
