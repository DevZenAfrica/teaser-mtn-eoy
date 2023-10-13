import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendAdvicePage } from './send-advice.page';

const routes: Routes = [
  {
    path: '',
    component: SendAdvicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendAdvicePageRoutingModule {}
