import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Response } from '@angular/http';

import { HTTPService } from '../../services/http.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    selector: 'index',
    templateUrl: 'index.component.html',
    styleUrls: ["index.component.scss"]
})
export class IndexComponent implements OnInit {
    
    private getReqData:any;
    model: any;
    searching = false;
    searchFailed = false;

    constructor(
        private router: Router,
        public toast:ToastsManager,
        public vcr: ViewContainerRef,
        private http:HTTPService
    ) {
        this.toast.setRootViewContainerRef(vcr);
    }

    ngOnInit(): void {
        this.toast.success("You are in home page!");
    }

    ngOnDestroy(): void {
        // this.toast.dispose();
    }

    logout(): void {
		localStorage.clear();
		this.router.navigate(['/']);
		this.toast.success("Logged out");
	}

    showData = () => {
        return JSON.stringify(this.model, null, " ");
    }

    formatter = (x: { title: string }) => x.title;

	searchPosts = (text$: Observable<string>) =>
		text$
			.debounceTime(300)
			.distinctUntilChanged()
			.do(() => this.searching = true)
			.switchMap(term => this.http.get("/posts"))
			.do(() => this.searching = false);

    
}
