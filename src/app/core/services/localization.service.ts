import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalizationService {
  private langSubject = new BehaviorSubject<string>(this.translate.currentLang);

  constructor(private translate: TranslateService) {}

  get lang$(): Observable<string> {
    return this.langSubject.asObservable();
  }
  get isArabic() {
    return this.translate.currentLang === 'ar';
  }

  setLanguage(lang: string) {
    this.langSubject.next(lang);
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('lang', lang.toLowerCase());
    this.setDirection(dir);
    this.translate.use(lang);
  }

  private setDirection(dir: string) {
    document.getElementsByTagName('html')[0].setAttribute('dir', dir);
  }
}
