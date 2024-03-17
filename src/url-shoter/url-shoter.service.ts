import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUrlShoterDto } from './dto/create-url-shoter.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UrlDocument, UrlShoter } from './schema/url-shoter.schema';
import { Model } from 'mongoose';
import { generateRandomString } from './urlShortFunction';
import {
  Analytics,
  AnalyticsDocument,
} from 'src/analytics/schema/analytics.schema';
import { CreateAnalyticsDto } from 'src/analytics/dto/create-analytics.dto';

@Injectable()
export class UrlShoterService {
  constructor(
    @InjectModel(UrlShoter.name) private UrlModel: Model<UrlDocument>,
    @InjectModel(Analytics.name)
    private AnalyticsModel: Model<AnalyticsDocument>,
  ) {}

  async create(createUrlShoterDto: CreateUrlShoterDto): Promise<any> {
    try {
      const Rnumber = generateRandomString(7);
      const createdURl = new this.UrlModel({
        ...createUrlShoterDto,
        shorten_url: Rnumber,
        user_id: createUrlShoterDto.user_id,
      });
      await createdURl.save();
      console.log(
        'createUrlShoterDto ',
        process.env.BACKEND_URL + '/g/' + createdURl.shorten_url,
      );
      const url = process.env.BACKEND_URL + '/g/' + createdURl.shorten_url;
      return {
        uriis: url,
        shorten_url_id: createdURl._id,
        createdURl,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error creating url');
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.UrlModel.findOne({ shorten_url: id });
      if (!result) {
        throw new NotFoundException('URL not found');
      }
      return result;
    } catch (error) {
      throw new InternalServerErrorException('Error getting URL');
    }
  }

  async addAnalytics(
    createAnalyticsDto: CreateAnalyticsDto,
  ): Promise<AnalyticsDocument> {
    try {
      const createdAnalytic = await this.AnalyticsModel.create({
        ...createAnalyticsDto,
      });
      return createdAnalytic;
    } catch (error) {
      throw new InternalServerErrorException('Error creating analytics');
    }
  }

  async getUserShortUrl(id: string): Promise<any> {
    try {
      const result = await this.UrlModel.find({ user_id: id });
      return result;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error finding analytics');
    }
  }
}
