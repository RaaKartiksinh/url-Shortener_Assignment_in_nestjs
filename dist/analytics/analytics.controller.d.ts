import { AnalyticsService } from './analytics.service';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    findOne(id: string, startTime: Date, endTime: Date): Promise<any>;
    remove(id: string): string;
}
