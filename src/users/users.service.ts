import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersExceptions } from './users.exceptions';
import { UserDTO, CreateUserDTO, UpdateUserDTO } from './dto/user.dto';
import { User, UserDocument } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly usersRepository: Model<UserDocument>,
  ) {}
  async findAll(): Promise<unknown> {
    return await this.usersRepository.find();
  }

  async findById(id: string): Promise<Partial<UserDTO>> {
    const user = await this.usersRepository.findById(id);
    if (!user) UsersExceptions.NotFoundError();

    return user;
  }

  async findByEmail(email: string): Promise<Partial<UserDTO>> {
    const user = await this.usersRepository.findOne({ email });
    if (!user) UsersExceptions.NotFoundError();

    return user;
  }

  async create(body: CreateUserDTO): Promise<Partial<UserDTO>> {
    const password_hash = await bcrypt.hash(body.password, 10);

    const newUser = {
      ...body,
      password_hash,
    };

    const user = await this.usersRepository.create(newUser);

    return user;
  }

  async update(id: string, body: UpdateUserDTO): Promise<Partial<UserDTO>> {
    const user = await this.findById(id);
    if (!user) UsersExceptions.NotFoundError();

    const password_hash = await bcrypt.hash(body.password, 10);
    await this.usersRepository.updateOne(
      { _id: id },
      { ...body, password_hash },
    );

    return await this.findById(id);
  }

  async delete(id: string): Promise<any> {
    return await this.usersRepository.deleteOne({ _id: id });
  }
}
