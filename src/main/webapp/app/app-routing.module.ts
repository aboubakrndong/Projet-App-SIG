import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { CreatezoneComponent } from 'app/createzone/createzone.component';
import { CreatealerteComponent } from 'app/createalerte/createalerte.component';
import { PopupComponent } from 'app/popup/popup.component';

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

        ...LAYOUT_ROUTES
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    )
  ],
  exports: [RouterModule]
})
export class OperatappliAppRoutingModule {}
