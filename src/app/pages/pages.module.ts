import { NgModule } from "@angular/core";
import { SharedModule } from '../shared/shared.module';

import { PagesComponent } from './pages.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PAGES_ROUTES } from './pages.routes';




@NgModule({
    declarations:[
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent,
    ],
    exports:[
        //se deben exportar todos los componentes que se usaran en otras partes que no sean los componentes registrados en este modulo
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent,
    ],
    imports:[
        SharedModule,
        PAGES_ROUTES
    ]
})
export class PagesModule {}