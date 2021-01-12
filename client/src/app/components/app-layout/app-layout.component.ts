import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AppState } from '../../app.service';
import { AuthService } from '../../auth/authService';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent implements OnInit {
    public name = 'HMS';
    public openSidebar = false;
    public openNotifications = false;
    public userType;
  constructor(
    public _appState: AppState,
    private _titleService: Title,
    private _router: Router,
    private _authenticationService: AuthService
  ) { }

  ngOnInit(): void {
    var token:any  = this._authenticationService.getToken();
    if(token)
    {
        token = this._authenticationService.decode();
        this.userType = token.user.type;
    }

    this.name = environment.name;
    this._titleService.setTitle(`${environment.name} Admin`);
    console.log('Initial App State', this._appState.state);
  }

    /**
     * [e description]
     * @type {[type]}
     */
    public logout(e: MouseEvent) {
        e.preventDefault();
        this.openSidebar = false;
        this._authenticationService.removeToken();
        this._router.navigate(['/']);
    }

}
