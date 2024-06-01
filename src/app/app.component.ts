import { Component, ViewChild } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'เว็บบริหารจัดการคลังสินค้า';
  showFiller = false;
  // @ViewChild(MatSidenavContainer) sidenavContainer: MatSidenavContainer;
  // ngAfterViewInit() {
  //   this.sidenavContainer.scrollable.elementScrolled().subscribe(() => /* react to scrolling */);
  // }
  // events: string[] = [];
  // opened!: boolean;

}



