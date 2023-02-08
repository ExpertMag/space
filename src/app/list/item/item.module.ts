import { ItemComponent } from './item.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  declarations: [ItemComponent],
  imports: [CommonModule, SharedModule],
  providers: [],
})
export class ItemModule {}
