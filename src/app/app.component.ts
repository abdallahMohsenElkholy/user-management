import { Component, inject } from '@angular/core';
import { LocalizationService } from './core/services/localization.service';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'user-management';
  private _localizationService = inject(LocalizationService);

  ngOnInit(): void {
    this.setLanguage();
  }

  setLanguage() {
    const lang = localStorage.getItem('lang');
    this._localizationService.setLanguage(lang || 'en');
  }
}
