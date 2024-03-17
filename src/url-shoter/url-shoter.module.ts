import { Module } from '@nestjs/common';
import { UrlShoterService } from './url-shoter.service';
import { UrlShoterController } from './url-shoter.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlShoter, urlShortSchema } from './schema/url-shoter.schema';
import { AuthModule } from '../auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';
import {
  Analytics,
  analyticsSchema,
} from 'src/analytics/schema/analytics.schema';

@Module({
  imports: [
    CacheModule.register({
      global: true,
    }),
    AuthModule,
    MongooseModule.forFeature([
      { name: UrlShoter.name, schema: urlShortSchema },
    ]),
    MongooseModule.forFeature([
      { name: Analytics.name, schema: analyticsSchema },
    ]),
  ],
  controllers: [UrlShoterController],
  providers: [UrlShoterService],
})
export class UrlShoterModule {}
