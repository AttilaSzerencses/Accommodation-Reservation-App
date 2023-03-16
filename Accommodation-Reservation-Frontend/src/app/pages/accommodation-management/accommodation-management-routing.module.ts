import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccommodationManagementComponent } from './accommodation-management.component';

const routes: Routes = [
  {path: '', component: AccommodationManagementComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccommodationManagementRoutingModule { }
