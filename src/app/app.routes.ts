import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';


export const routes: Routes = [
  {path: "home", component: HomePageComponent},
  {path: "", redirectTo: "home", pathMatch: "full"},
  {path: "profile", component: ProfilePageComponent},
];
