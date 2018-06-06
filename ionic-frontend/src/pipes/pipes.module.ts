import { NgModule } from '@angular/core';
import { ReverseOrderPipe } from './reverse-order/reverse-order';
@NgModule({
	declarations: [ReverseOrderPipe],
	imports: [],
	exports: [ReverseOrderPipe]
})
export class PipesModule {}
