import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersTableComponent } from '../../users-table/users-table.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, UsersTableComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  textDir!: 'ltr' | 'rtl';
  lang: string = 'en';
  currentLang: any;

  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'ar']);
  }

  ngOnInit() {
    //Change Lang:
    this.currentLang = this.translate.currentLang || 'en';
    if (this.currentLang == "en") {
      this.textDir = 'ltr';
    } else if (this.currentLang == "ar") {
      this.textDir = 'rtl';
    }
  }
}
