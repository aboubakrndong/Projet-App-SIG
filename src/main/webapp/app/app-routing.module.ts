import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { CreatezoneComponent } from 'app/createzone/createzone.component';
import { CreatealerteComponent } from 'app/createalerte/createalerte.component';
import { PopupComponent } from 'app/popup/popup.component';
import { VueqosComponent } from 'app/vueqos/vueqos.component';
import { VuekpiComponent } from 'app/vuekpi/vuekpi.component';
import { VuebtsComponent } from 'app/vuebts/vuebts.component';
import { VoirbtsComponent } from 'app/voirbts/voirbts.component';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'admin',
          loadChildren: './admin/admin.module#OperatappliAdminModule'
        },
        {
          path: 'createzone',
          component: CreatezoneComponent
        },
        {
          path: 'createalerte',
          component: CreatealerteComponent
        },
        {
          path: 'editzone',
          component: PopupComponent
        },
        {
          path: 'affichbts',
          component: VuebtsComponent
        },
        {
          path: 'affichkpi',
          component: VuekpiComponent
        },

        {
          path: 'affichqos',
          component: VueqosComponent
        },
        {
          path: 'afichbts',
          component: VoirbtsComponent
        },

        ...LAYOUT_ROUTES
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    )
  ],
  exports: [RouterModule]
})
export class OperatappliAppRoutingModule {}
