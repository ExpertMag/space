import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacteristicComponent } from './characteristic/characteristic.component';
import { ConcatPipe } from './pipes/array.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [CharacteristicComponent, ConcatPipe],
  exports: [CharacteristicComponent, ConcatPipe],
})
export class SharedModule {}
