import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendAdvicePageRoutingModule } from './send-advice-routing.module';

import { SendAdvicePage } from './send-advice.page';
import {PreviewHeadlinePageModule} from "../preview-headline/preview-headline.module";
import {TranslateModule} from "@ngx-translate/core";
import {HomePageModule} from "../home/home.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendAdvicePageRoutingModule,
    PreviewHeadlinePageModule,
    TranslateModule,
    HomePageModule
  ],
  declarations: [SendAdvicePage]
})
export class SendAdvicePageModule {}
