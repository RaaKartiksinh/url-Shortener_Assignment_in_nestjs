import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Analytics {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
    userId: mongoose.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'urlshoters' })
    shorten_url_id: mongoose.Types.ObjectId;

    @Prop({ required: true })
    browser: string; // Change the type to string

    @Prop({ required: true, type: Boolean, default: true })
    isMobile: boolean;

    @Prop({ required: true, default: Date.now(), index: true }) 
    time: Date;
}

export type AnalyticsDocument = Analytics & Document;
export const analyticsSchema = SchemaFactory.createForClass(Analytics);
