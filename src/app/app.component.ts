import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public variavel: any;
	public dados$: Observable<any> = this.appService.getTeste();

	constructor(
		private appService: AppService
	) { }

}
