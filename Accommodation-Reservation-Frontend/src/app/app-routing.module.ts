import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccommodationProviderGuard } from './shared/services/accommodation-provider.guard';
import { AdminGuard } from './shared/services/admin.guard';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [

  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule)
  },

  {
    path: 'registration',
    loadChildren: () => import('./pages/registration/registration.module').then(m => m.RegistrationModule),
    canActivate: [ AuthGuard ]
  },

  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
    canActivate: [ AuthGuard ]
  },

  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [ AuthGuard ]
  },

  {
    path: 'aboutus',
    loadChildren: () => import('./pages/aboutus/aboutus.module').then(m => m.AboutusModule)
  },

  {
    path: 'user-activation',
    loadChildren: () => import('./pages/user-activation/user-activation.module').then(m => m.UserActivationModule)
  },

  {
    path: 'accommodation',
    loadChildren: () => import('./pages/accommodation/accommodation.module').then(m => m.AccommodationModule)
  },

  {
    path: 'reservation',
    loadChildren: () => import('./pages/reservation/reservation.module').then(m => m.ReservationModule),
    canActivate: [ AuthGuard ]
  },

  {
    path: 'createAccommodation',
    loadChildren: () => import('./pages/create-accommodation/create-accommodation.module').then(m => m.CreateAccommodationModule),
    canActivate: [ AuthGuard ]
  },

  {
    path: 'createRoom',
    loadChildren: () => import('./pages/create-room/create-room.module').then(m => m.CreateRoomModule),
    canActivate: [ AccommodationProviderGuard ]
  },

  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
    canActivate: [ AdminGuard ]
  },

  {
    path: 'accommodationManagement',
    loadChildren: () => import('./pages/accommodation-management/accommodation-management.module').then(m => m.AccommodationManagementModule),
    canActivate: [ AccommodationProviderGuard ]
  },

  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
