import { Controller, Get, Param, Delete, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('/get/:id')
  findOne(
    @Param('id') id: string,
    @Query('startTime') startTime: Date,
    @Query('endTime') endTime: Date,
  ) {
    return this.analyticsService.findOne(id, startTime, endTime);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.analyticsService.remove(+id);
  }
}
