/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { CreateUrlShoterDto } from './dto/create-url-shoter.dto';
import { UrlDocument, UrlShoter } from './schema/url-shoter.schema';
import { Model } from 'mongoose';
import { AnalyticsDocument } from 'src/analytics/schema/analytics.schema';
import { CreateAnalyticsDto } from 'src/analytics/dto/create-analytics.dto';
export declare class UrlShoterService {
    private UrlModel;
    private AnalyticsModel;
    constructor(UrlModel: Model<UrlDocument>, AnalyticsModel: Model<AnalyticsDocument>);
    create(createUrlShoterDto: CreateUrlShoterDto): Promise<any>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, UrlDocument> & UrlShoter & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    addAnalytics(createAnalyticsDto: CreateAnalyticsDto): Promise<AnalyticsDocument>;
    getUserShortUrl(id: string): Promise<any>;
}
