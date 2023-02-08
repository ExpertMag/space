import {ItemModule} from './item/item.module';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from '../app-routing.module';
import {SharedModule} from './../../shared/shared.module';
import {ListComponent} from './list.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [ListComponent],
    imports: [
        CommonModule,
        AppRoutingModule,
        SharedModule,
        ItemModule,
        ReactiveFormsModule
    ],
  providers: [],
})
export class ListModule {}
