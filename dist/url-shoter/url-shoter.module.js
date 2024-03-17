"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlShoterModule = void 0;
const common_1 = require("@nestjs/common");
const url_shoter_service_1 = require("./url-shoter.service");
const url_shoter_controller_1 = require("./url-shoter.controller");
const mongoose_1 = require("@nestjs/mongoose");
const url_shoter_schema_1 = require("./schema/url-shoter.schema");
const auth_module_1 = require("../auth/auth.module");
const cache_manager_1 = require("@nestjs/cache-manager");
const analytics_schema_1 = require("../analytics/schema/analytics.schema");
let UrlShoterModule = class UrlShoterModule {
};
exports.UrlShoterModule = UrlShoterModule;
exports.UrlShoterModule = UrlShoterModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cache_manager_1.CacheModule.register({
                global: true,
            }),
            auth_module_1.AuthModule,
            mongoose_1.MongooseModule.forFeature([
                { name: url_shoter_schema_1.UrlShoter.name, schema: url_shoter_schema_1.urlShortSchema },
            ]),
            mongoose_1.MongooseModule.forFeature([
                { name: analytics_schema_1.Analytics.name, schema: analytics_schema_1.analyticsSchema },
            ]),
        ],
        controllers: [url_shoter_controller_1.UrlShoterController],
        providers: [url_shoter_service_1.UrlShoterService],
    })
], UrlShoterModule);
//# sourceMappingURL=url-shoter.module.js.map