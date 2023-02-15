import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from '@app/app.component';

const routes: Routes = [
     { path: '', redirectTo: '/app/dashboard', pathMatch: 'full' },
    {
        path: 'account',
        loadChildren: () => import('./account/account.module').then(m => m.AccountModule), // Lazy load account module
        data: { preload: true }
    },
    {
        path: 'app',
        component:AppComponent,
        loadChildren: () => import('app/app.module').then(m => m.AppModule), // Lazy load account module
        data: { preload: true }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class RootRoutingModule { }
