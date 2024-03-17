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
exports.UrlShoterController = void 0;
const common_1 = require("@nestjs/common");
const url_shoter_service_1 = require("./url-shoter.service");
const create_url_shoter_dto_1 = require("./dto/create-url-shoter.dto");
const passport_1 = require("@nestjs/passport");
const cache_manager_1 = require("@nestjs/cache-manager");
const useragent = require("express-useragent");
let UrlShoterController = class UrlShoterController {
    constructor(urlShoterService, cacheManager) {
        this.urlShoterService = urlShoterService;
        this.cacheManager = cacheManager;
    }
    async create(createUrlShoterDto) {
        return this.urlShoterService.create(createUrlShoterDto);
    }
    async findOne(id, request, res) {
        try {
            const userAgent = useragent.parse(request.headers['user-agent'] || '');
            const browserName = userAgent.browser;
            console.log('browserName fc', browserName);
            const cachedUrl = await this.cacheManager.get(id);
            if (cachedUrl) {
                await this.urlShoterService.addAnalytics({
                    userId: cachedUrl.user_id,
                    shorten_url_id: cachedUrl.shorten_url_id,
                    browser: browserName,
                    isMobile: userAgent.isMobile,
                    time: Date.now(),
                });
                return res.redirect(cachedUrl.original_urlame);
            }
            const result = await this.urlShoterService.findOne(id);
            await this.urlShoterService.addAnalytics({
                userId: result.user_id,
                shorten_url_id: result._id,
                browser: browserName,
                isMobile: userAgent.isMobile,
                time: Date.now(),
            });
            await this.cacheManager.set(id, {
                original_urlame: result.original_urlame,
                shorten_url_id: result._id,
                user_id: result.user_id,
            }, 24 * 60 * 60);
            res.redirect(result.original_urlame);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                res.status(404).send('URL not found');
            }
            else {
                res.status(500).send('Internal Server Error');
            }
        }
    }
    analytics(id) {
        return this.urlShoterService.getUserShortUrl(id);
    }
};
exports.UrlShoterController = UrlShoterController;
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Post)('/urlshort/add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_url_shoter_dto_1.CreateUrlShoterDto]),
    __metadata("design:returntype", Promise)
], UrlShoterController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/g/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], UrlShoterController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Get)('/usershorturl/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UrlShoterController.prototype, "analytics", null);
exports.UrlShoterController = UrlShoterController = __decorate([
    (0, common_1.Controller)(),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [url_shoter_service_1.UrlShoterService, Object])
], UrlShoterController);
//# sourceMappingURL=url-shoter.controller.js.map