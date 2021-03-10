import { environment } from "./../../../environments/environment";
import { Inject, Injectable, LOCALE_ID } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Styles } from "./interfaces/styles";
import { Lang } from "./interfaces/lang.enum";
import { Observable, of } from "rxjs";

import { HttpHeaders } from "@angular/common/http";
@Injectable({
    providedIn: "root",
})
export class OverrideService {
    language: Observable<string>;
    constructor(
        @Inject(LOCALE_ID) public locale: string,
        private titleService: Title
    ) {
        this.language = of(localStorage.getItem("language"));
    }
    number = 1;
    // Languages
    get currentLang() {
        return this.locale == "en" || this.locale == "ms" || this.locale == "ar"
            ? this.locale
            : "en";
    }
    get lang(): Observable<string> {
        return this.language;
    }

    public get userType(): string {
        return atob(sessionStorage.getItem(btoa("userType")));
    }

    public get loggedIn(): boolean {
        return sessionStorage.getItem("token")
            ? sessionStorage.getItem("token") != null &&
                  sessionStorage.getItem("token") != undefined
            : false;
    }
    get otherLang() {
        switch (localStorage.getItem("language")) {
            case "en":
                return "ar";
            case "ar":
                return "en";
            default:
                return "en";
        }
    }

    switchLanguage(language: string, key?: string) {
        if (language in Lang) {
            // console.log(language in Lang);
            // console.log(this.currentLang, language);

            //   if (this.currentLang != language) {
            // this.translate.use(language);
            // this.language = of(language);
            localStorage.setItem("language", language);
            // this.setTitle(key || 'Edu-promise');
            this.setStyle();
            // window.location.reload();
            //   }
        } else {
            //   this.translate.use('en');
        }
    }

    inverseLang(keyLang) {
        return keyLang === "en" ? "ar" : "en";
    }

    // Title
    //   setTitle(key: string) {
    //     return this.translate.get(key).subscribe((data) => {
    //       this.titleService.setTitle(data);
    //     });
    //   }

    // Style
    setStyle() {
        const keyLang = this.currentLang;
        const styleFiles = Styles[keyLang];
        const htmlElement = document.getElementsByTagName("html")[0];
        const headElements = document.getElementsByTagName("head")[0];
        const links = document.getElementsByTagName("link");
        // const paras = document.getElementsByClassName(this.inverseLang(keyLang));
        // if (paras) {
        //   while (paras[0]) {
        //     paras[0].parentNode.removeChild(paras[0]);
        //   }
        // }
        // htmlElement.setAttribute('lang', keyLang);
        // if (keyLang === 'ar') {
        //   htmlElement.setAttribute('dir', 'rtl');
        // } else {
        //   htmlElement.setAttribute('dir', 'ltr');
        // }

        let l = headElements.getElementsByClassName(keyLang);
        console.log(l);

        if (this.number > 1) {
            links.item(links.length - 1).remove();
        }
        for (let i = 0; i < styleFiles.length; i++) {
            const node = document.createElement("link");
            node.setAttribute("rel", "stylesheet");
            // node.setAttribute('type', 'text/css');
            node.setAttribute("href", Styles[keyLang][i]);
            // node.setAttribute('class',keyLang)

            headElements.appendChild(node);
        }
        console.log("fl");
        this.number++;
    }

    isRTL(): boolean {
        let rtl = false;
        this.lang.subscribe((lang) => {
            lang == "ar" ? (rtl = true) : (rtl = false);
        });
        return rtl;
    }

    public get AuthHeaders(): HttpHeaders {
        return new HttpHeaders({
            Authorization: "Bearer " + environment.clientId,
        });
    }
    public get AuthHeadersFileUpload(): HttpHeaders {
        return new HttpHeaders({
            Authorization: "Bearer " + environment.fileKey,
        });
    }
}
