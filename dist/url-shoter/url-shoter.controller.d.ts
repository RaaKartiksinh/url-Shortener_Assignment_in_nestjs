import { UrlShoterService } from './url-shoter.service';
import { Request, Response } from 'express';
import { CreateUrlShoterDto } from './dto/create-url-shoter.dto';
import { Cache } from 'cache-manager';
export declare class UrlShoterController {
    private readonly urlShoterService;
    private cacheManager;
    constructor(urlShoterService: UrlShoterService, cacheManager: Cache);
    create(createUrlShoterDto: CreateUrlShoterDto): Promise<any>;
    findOne(id: string, request: Request, res: Response): Promise<void>;
    analytics(id: string): Promise<any>;
}
