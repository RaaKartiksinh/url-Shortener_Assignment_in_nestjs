import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  Res,
  UseGuards,
  Inject,
  Req,
} from '@nestjs/common';
import { UrlShoterService } from './url-shoter.service';
import { Request, Response } from 'express';
import { CreateUrlShoterDto } from './dto/create-url-shoter.dto';
import { AuthGuard } from '@nestjs/passport';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import * as useragent from 'express-useragent';

interface CachedUrl {
  original_urlame: string;
  shorten_url_id: string;
  user_id: string;
}

@Controller()
export class UrlShoterController {
  constructor(
    private readonly urlShoterService: UrlShoterService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @UseGuards(AuthGuard())
  @Post('/urlshort/add')
  async create(@Body() createUrlShoterDto: CreateUrlShoterDto) {
    return this.urlShoterService.create(createUrlShoterDto);
  }

  @Get('/g/:id')
  async findOne(
    @Param('id') id: string,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    try {
      const userAgent = useragent.parse(request.headers['user-agent'] || '');
      const browserName = userAgent.browser;
      console.log('browserName fc', browserName);

      const cachedUrl: CachedUrl = await this.cacheManager.get(id);
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
      await this.cacheManager.set(
        id,
        {
          original_urlame: result.original_urlame,
          shorten_url_id: result._id,
          user_id: result.user_id,
        },
        24 * 60 * 60,
      );
      res.redirect(result.original_urlame);
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(404).send('URL not found');
      } else {
        res.status(500).send('Internal Server Error');
      }
    }
  }

  @UseGuards(AuthGuard())
  @Get('/usershorturl/:id')
  analytics(@Param('id') id: string) {
    return this.urlShoterService.getUserShortUrl(id);
  }
}
