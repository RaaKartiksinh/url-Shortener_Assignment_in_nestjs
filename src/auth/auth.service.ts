import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from 'src/users/schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { signUpAuthDto } from './dto/signUp-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  // signUp
  async signUp(signUpAuthDto: signUpAuthDto): Promise<{ token: string }> {
    try {
      const hashPass = await bcrypt.hash(signUpAuthDto.password, 10);
      const createdUser = new this.userModel({
        ...signUpAuthDto,
        password: hashPass,
      });
      await createdUser.save();
      const createdUserObject = createdUser.toObject();
      delete createdUserObject.password;
      const token = this.jwtService.sign({ id: createdUserObject });
      return { token };
    } catch (error) {
      throw new InternalServerErrorException('Error creating user');
    }
  }

  // signIn
  async login(email: string, password: string): Promise<{ token: string }> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException(`User with email '${email}' not found`);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }
    const userObject = user.toObject();
    delete userObject.password;
    const token = this.jwtService.sign({ id: userObject });
    return { token };
  }
}
