import { Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { NoContentComponent } from './components/no-content/no-content.component';
import { LoginComponent } from './components/login/login.component';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';

export const ROUTES: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: AppLayoutComponent,
        children:[
            {
                path: '',
                loadChildren: () => import('./components/dashboard').then(m => m.DashboardModule),
                canActivate: [AuthGuard]
            }, {
                path: 'bookings',
                loadChildren: () => import('./components/bookings').then(m => m.BookingsModule),
                canActivate: [AuthGuard]
            }, {
                path: 'guests',
                loadChildren: () => import('./components/guests').then(m => m.GuestsModule),
                canActivate: [AuthGuard]
            }, {
                path: 'payments',
                loadChildren: () => import('./components/payments').then(m => m.PaymentsModule),
                canActivate: [AuthGuard]
            }, {
                path: 'rooms',
                loadChildren: () => import('./components/rooms').then(m => m.RoomsModule),
                canActivate: [AuthGuard]
            }, {
                path: 'users',
                loadChildren: () => import('./components/users/users.module').then(m => m.UsersModule),
                canActivate: [AuthGuard]
            },{
                path: 'permissions',
                loadChildren: () => import('./components/permission/permission.module').then(m => m.PermissionModule),
                canActivate: [AuthGuard]
            },{
                path: 'roles',
                loadChildren: () => import('./components/roles/role.module').then(m => m.RoleModule),
                canActivate: [AuthGuard]
            },
        ]
    },
    {
        path: '**',
        component: NoContentComponent
    }
];
