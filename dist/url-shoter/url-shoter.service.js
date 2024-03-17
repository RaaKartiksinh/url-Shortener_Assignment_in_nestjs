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
exports.UrlShoterService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const url_shoter_schema_1 = require("./schema/url-shoter.schema");
const mongoose_2 = require("mongoose");
const urlShortFunction_1 = require("./urlShortFunction");
const analytics_schema_1 = require("../analytics/schema/analytics.schema");
let UrlShoterService = class UrlShoterService {
    constructor(UrlModel, AnalyticsModel) {
        this.UrlModel = UrlModel;
        this.AnalyticsModel = AnalyticsModel;
    }
    async create(createUrlShoterDto) {
        try {
            const Rnumber = (0, urlShortFunction_1.generateRandomString)(7);
            const createdURl = new this.UrlModel({
                ...createUrlShoterDto,
                shorten_url: Rnumber,
                user_id: createUrlShoterDto.user_id,
            });
            await createdURl.save();
            console.log('createUrlShoterDto ', process.env.BACKEND_URL + '/g/' + createdURl.shorten_url);
            const url = process.env.BACKEND_URL + '/g/' + createdURl.shorten_url;
            return {
                uriis: url,
                shorten_url_id: createdURl._id,
                createdURl,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error creating url');
        }
    }
    async findOne(id) {
        try {
            const result = await this.UrlModel.findOne({ shorten_url: id });
            if (!result) {
                throw new common_1.NotFoundException('URL not found');
            }
            return result;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error getting URL');
        }
    }
    async addAnalytics(createAnalyticsDto) {
        try {
            const createdAnalytic = await this.AnalyticsModel.create({
                ...createAnalyticsDto,
            });
            return createdAnalytic;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error creating analytics');
        }
    }
    async getUserShortUrl(id) {
        try {
            const result = await this.UrlModel.find({ user_id: id });
            return result;
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error finding analytics');
        }
    }
};
exports.UrlShoterService = UrlShoterService;
exports.UrlShoterService = UrlShoterService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(url_shoter_schema_1.UrlShoter.name)),
    __param(1, (0, mongoose_1.InjectModel)(analytics_schema_1.Analytics.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], UrlShoterService);
//# sourceMappingURL=url-shoter.service.js.map