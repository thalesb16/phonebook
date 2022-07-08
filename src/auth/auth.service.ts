import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    const passwordIsEqual = await bcrypt.compare(password, user.password_hash);

    if (!passwordIsEqual) {
      throw new HttpException(
        {
          status: 400,
          error: 'Bad Request',
          message: 'wrong password',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return user && passwordIsEqual ? user : null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };

    return {
      name: user.name,
      email: user.email,
      acess_token: this.jwtService.sign(payload),
    };
  }
}
