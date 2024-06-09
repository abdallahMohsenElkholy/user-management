import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule,TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [AuthService ,HttpClientModule]
})
export class HeaderComponent {
  constructor(private translate: TranslateService, private router: Router) {}

  get currentLang() {
    return this.translate.currentLang;
  }

  switchingLanguage() {
    if (this.currentLang === 'en') {
      localStorage.setItem('lang', 'ar');
    } else {
      localStorage.setItem('lang', 'en');
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
