import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ExercisesPageComponent } from './pages/exercises-page/exercises-page.component';
import { ExerciseSentencesComponent } from './components/exercises/exercise-sentences/exercise-sentences.component';
import { ExerciseWordsComponent } from './components/exercises/exercise-words/exercise-words.component';
import { ExerciseListeningComponent } from './components/exercises/exercise-listening/exercise-listening.component';


export const routes: Routes = [
  {path: "home", component: HomePageComponent},
  {path: "", redirectTo: "home", pathMatch: "full"},
  {path: "profile", component: ProfilePageComponent},
  {path: "exercises", component: ExercisesPageComponent},
  {path: "exercises/sentences", component: ExerciseSentencesComponent},
  {path: "exercises/words", component: ExerciseWordsComponent},
  {path: "exercises/listening", component: ExerciseListeningComponent}
];
