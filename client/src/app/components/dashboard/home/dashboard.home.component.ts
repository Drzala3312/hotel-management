import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { GuestsController } from '../../../ducks/guests/guests.controller';
import { RoomsController } from '../../../ducks/rooms/rooms.controller';
import { BookingsController } from '../../../ducks/bookings/bookings.controller';
import { UsersController } from '../../../ducks/users/users.controller';
import { AuthService } from '../../../auth/authService';

@Component({
    selector: 'list-dashboard',
    templateUrl: './dashboard.home.component.html',
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

    totalBookings;
    totalRooms;
    totalGuests;
    totalUsers;
    userType;
    constructor(private _guest: GuestsController,
        private _rooms: RoomsController,
        private _booking: BookingsController,
        private _user: UsersController,
        private _authenticationService: AuthService) { }
    ngOnInit() {
        var token:any  = this._authenticationService.decode();
        this.userType = token.user.type;
        this._guest.getGuestCounts().subscribe(data => {
            this.totalGuests = data[0][0].total;
        });
        this._rooms.getRoomCounts().subscribe(data => {
            this.totalRooms = data[0][0].total;
        });
        this._booking.getBookingCounts().subscribe(data => {
            this.totalBookings = data[0][0].total;
        });
        this._user.getUserCounts().subscribe(data =>{
            this.totalUsers = data[0][0].total;
        });
    }
}
