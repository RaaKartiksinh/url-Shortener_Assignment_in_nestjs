import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/users/schema/user.schema';

@Schema({ timestamps: true })
export class UrlShoter {
  @Prop({ required: true })
  original_urlame: string;

  @Prop({ required: true, unique: true })
  shorten_url: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
  user_id: User;

  @Prop({ required: true, default: Date.now() })
  expiry_date: Date;
}
export type UrlDocument = UrlShoter & Document;
export const urlShortSchema = SchemaFactory.createForClass(UrlShoter);
urlShortSchema.index(
  { expiry_date: 1 },
  { expireAfterSeconds: 2 * 365 * 24 * 60 * 60 },
);
