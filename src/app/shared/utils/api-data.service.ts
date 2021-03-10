import { catchError } from "rxjs/operators";
import { environment } from "./../../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Config } from "protractor";

import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Injectable({
    providedIn: "root",
})
export class ApiDataService {
    headers: HttpHeaders;

    config: Config;

    data: any;
    error: any;
    httpOptions: { headers: HttpHeaders; observe: "response" };
    public online: boolean = navigator.onLine;

    constructor(
        private http: HttpClient,
        private router: Router,
        private toastr: ToastrService
    ) {}

    post(url: string, body: any[] | any, headers?) {
        if (this.online) {
            this.httpOptions = this.getHeadders(headers);
            if (url && body) {
                return this.http
                    .post<Config>(url, body, this.httpOptions)
                    .pipe(catchError((err) => this.resolveNotAuthrized(err)));
            }
        } else {
            this.showToast(
                "You Are Offilne, Please Check your Internet Connection"
            );
        }
    }

    login(url: string, credintials: any) {
        if (this.online) {
            //Basic
            this.httpOptions = {
                headers: new HttpHeaders({
                    Authorization: "Bearer " + environment.clientId,
                    // 'content-type': 'application/x-www-form-urlencoded',
                }),
                observe: "response",
            };
            if (url && credintials) {
                return this.http
                    .post<Config>(url, credintials, this.httpOptions)
                    .pipe(catchError((err) => this.resolveNotAuthrized(err)));
            } else {
                this.showToast(
                    "You Are Offilne, Please Check your Internet Connection"
                );
            }
        }
    }

    register(url: string, credintials: any) {
        if (this.online) {
            //Basic
            this.httpOptions = {
                headers: new HttpHeaders({
                    Authorization: "Bearer " + environment.clientId,
                }),
                observe: "response",
            };
            if (url && credintials) {
                return this.http
                    .post<Config>(url, credintials, this.httpOptions)
                    .pipe(catchError((err) => this.resolveNotAuthrized(err)));
            } else {
                this.showToast(
                    "You Are Offilne, Please Check your Internet Connection"
                );
            }
        }
    }

    update(url: string, body: any) {
        if (this.online) {
            this.httpOptions = this.getHeadders(null);

            if (url && body) {
                return this.http
                    .put(url, body, this.httpOptions)
                    .pipe(catchError((err) => this.resolveNotAuthrized(err)));
            }
        } else {
            this.showToast(
                "You Are Offilne, Please Check your Internet Connection"
            );
        }
    }

    delete(url: string, body: any) {
        this.httpOptions = this.getHeadders(null);
        if (this.online) {
            if (url) {
                return this.http
                    .request("delete", url, {
                        body: body,
                        headers: this.httpOptions.headers,
                        observe: this.httpOptions.observe,
                    })
                    .pipe(catchError((err) => this.resolveNotAuthrized(err)));
            }
        } else {
            this.showToast(
                "You Are Offilne, Please Check your Internet Connection"
            );
        }
    }

    getData(url: string, headers?: HttpHeaders) {
        if (this.online) {
            this.httpOptions = this.getHeadders(headers);

            if (url) {
                return this.http
                    .get<Config>(url, this.httpOptions)
                    .pipe(catchError((err) => this.resolveNotAuthrized(err)));
            }
        } else {
            this.showToast(
                "You Are Offilne, Please Check your Internet Connection"
            );
        }
    }

    resolveNotAuthrized(error) {
        if (error.status == 401) {
            this.showErrToast(error.error.errors, error.error.statusCode);
            this.router.navigate(["/error"]);
        } else {
            //   this.showErrToast(this.translate.instant(error.error.errors), error.error.statusCode);
            return error;
        }
    }
    showToast(message) {
        this.toastr.success(message, "Success");
    }
    showErrToast(message, status) {
        this.toastr.error(message, status);
    }

    private getHeadders(
        headers
    ): { headers: HttpHeaders; observe: "response" } {
        // console.log(sessionStorage.getItem('token'));

        return {
            headers: headers
                ? headers
                : new HttpHeaders({
                      Authorization:
                          "Bearer " + sessionStorage.getItem("token"),
                  }),
            observe: "response",
        };
    }
}
