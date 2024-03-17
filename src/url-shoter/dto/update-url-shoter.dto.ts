import { PartialType } from '@nestjs/mapped-types';
import { CreateUrlShoterDto } from './create-url-shoter.dto';

export class UpdateUrlShoterDto extends PartialType(CreateUrlShoterDto) {}
