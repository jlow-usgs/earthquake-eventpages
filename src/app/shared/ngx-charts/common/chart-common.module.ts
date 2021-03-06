import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartCommonModule as NgxChartCommonModule } from '@swimlane/ngx-charts';

import { ShapeComponent } from '../common/shape/shape.component';
import { CustomLegendComponent } from './custom-legend/custom-legend.component';
import { CustomChartComponent } from './custom-chart/custom-chart.component';
import { CustomLegendEntryComponent } from './custom-legend-entry/custom-legend-entry.component';

@NgModule({
  declarations: [
    ShapeComponent,
    CustomLegendComponent,
    CustomChartComponent,
    CustomLegendEntryComponent
  ],
  exports: [
    ShapeComponent,
    CustomLegendComponent,
    CustomChartComponent
  ],
  imports: [
    CommonModule,
    NgxChartCommonModule,
  ]
})
export class ChartCommonModule { }
