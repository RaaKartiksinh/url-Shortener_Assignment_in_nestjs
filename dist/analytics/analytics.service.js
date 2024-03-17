"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const analytics_schema_1 = require("./schema/analytics.schema");
let AnalyticsService = class AnalyticsService {
    constructor(AnalyticsModel) {
        this.AnalyticsModel = AnalyticsModel;
    }
    async findOne(shorten_url_id, startTime, endTime) {
        try {
            const result = await this.AnalyticsModel.find({
                shorten_url_id: shorten_url_id,
                time: { $gte: startTime, $lte: endTime },
            });
            const mobileClicks = result.filter((entry) => entry.isMobile === true);
            const nonMobileClicks = result.filter((entry) => entry.isMobile === false);
            const browserCounts = {};
            result.forEach((entry) => {
                const browser = entry.browser;
                if (browserCounts[browser]) {
                    browserCounts[browser]++;
                }
                else {
                    browserCounts[browser] = 1;
                }
            });
            return {
                TotalClicks: result.length,
                MobileClicks: mobileClicks.length,
                NonMobileClicks: nonMobileClicks.length,
                BrowserCounts: browserCounts,
                result
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error finding analytics');
        }
    }
    remove(id) {
        return `This action removes a #${id} analytics`;
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(analytics_schema_1.Analytics.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map