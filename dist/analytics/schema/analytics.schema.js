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
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyticsSchema = exports.Analytics = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Analytics = class Analytics {
};
exports.Analytics = Analytics;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'users' }),
    __metadata("design:type", mongoose_2.default.Types.ObjectId)
], Analytics.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'urlshoters' }),
    __metadata("design:type", mongoose_2.default.Types.ObjectId)
], Analytics.prototype, "shorten_url_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Analytics.prototype, "browser", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], Analytics.prototype, "isMobile", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: Date.now(), index: true }),
    __metadata("design:type", Date)
], Analytics.prototype, "time", void 0);
exports.Analytics = Analytics = __decorate([
    (0, mongoose_1.Schema)()
], Analytics);
exports.analyticsSchema = mongoose_1.SchemaFactory.createForClass(Analytics);
//# sourceMappingURL=analytics.schema.js.map