import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class signUpAuthDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please Enter correct Email ...!' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}
