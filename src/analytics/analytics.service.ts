import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Analytics, AnalyticsDocument } from './schema/analytics.schema';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(Analytics.name)
    private AnalyticsModel: Model<AnalyticsDocument>,
  ) { }

  // async findOne(
  //   shorten_url_id: string,
  //   startTime: Date,
  //   endTime: Date,
  // ): Promise<any> {
  //   try {
  //     const result = await this.AnalyticsModel.find({
  //       shorten_url_id: shorten_url_id,
  //       time: { $gte: startTime, $lte: endTime },
  //     });
  //     let moblieClikes = result.filter((e) => {
  //       e.isMobile === true
  //     })
  //     return { TotalCliks: result.length, result };
  //   } catch (error) {
  //     console.error(error);
  //     throw new InternalServerErrorException('Error finding analytics');
  //   }
  // }

  async findOne(
    shorten_url_id: string,
    startTime: Date,
    endTime: Date,
): Promise<any> {
    try {
        const result = await this.AnalyticsModel.find({
            shorten_url_id: shorten_url_id,
            time: { $gte: startTime, $lte: endTime },
        });

        // Filter results for mobile and non-mobile clicks
        const mobileClicks = result.filter((entry) => entry.isMobile === true);
        const nonMobileClicks = result.filter((entry) => entry.isMobile === false);

        // Count clicks per browser
        const browserCounts = {};
        result.forEach((entry) => {
            const browser = entry.browser;
            if (browserCounts[browser]) {
                browserCounts[browser]++;
            } else {
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
    } catch (error) {
        console.error(error);
        throw new InternalServerErrorException('Error finding analytics');
    }
}



  remove(id: number) {
    return `This action removes a #${id} analytics`;
  }
}
