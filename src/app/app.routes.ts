import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ExercisesPageComponent } from './pages/exercises-page/exercises-page.component';
import { ExerciseSentencesComponent } from './components/exercises/exercise-sentences/exercise-sentences.component';


export const routes: Routes = [
  {path: "home", component: HomePageComponent},
  {path: "", redirectTo: "home", pathMatch: "full"},
  {path: "profile", component: ProfilePageComponent},
  {path: "exercises", component: ExercisesPageComponent},
  {path: "exercises/sentences", component: ExerciseSentencesComponent}
];
