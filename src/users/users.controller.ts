import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { isObjectIdOrHexString } from 'mongoose';
import { UsersExceptions } from './users.exceptions';
import { UsersService } from './users.service';
import { UserDTO, CreateUserDTO, UpdateUserDTO } from './dto/user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiForbiddenResponse({ description: 'Forbidden. ' })
@ApiBadRequestResponse({ description: 'Bad Request.' })
@ApiUnauthorizedResponse({ description: 'Unauthorized.' })
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'List all users' })
  @ApiOkResponse({ description: 'Ok', type: [UserDTO] })
  @UseGuards(JwtAuthGuard)
  @Get()
  async get(): Promise<unknown> {
    return await this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Get a user' })
  @ApiOkResponse({ description: 'Ok', type: UserDTO })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id') id: string): Promise<Partial<UserDTO>> {
    if (!isObjectIdOrHexString(id)) UsersExceptions.ObjectIdError();

    return await this.usersService.findById(id);
  }

  @ApiOperation({ summary: 'Create user' })
  @ApiOkResponse({ status: 201, description: 'Ok', type: UserDTO })
  @Post()
  async post(@Body() body: CreateUserDTO): Promise<Partial<UserDTO>> {
    return await this.usersService.create(body);
  }

  @ApiOperation({ summary: 'Update ontact' })
  @ApiOkResponse({ description: 'Ok', type: UserDTO })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async put(
    @Param('id') id: string,
    @Body() body: UpdateUserDTO,
  ): Promise<Partial<UserDTO>> {
    if (!isObjectIdOrHexString(id)) UsersExceptions.ObjectIdError();

    return await this.usersService.update(id, body);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiOkResponse({ description: 'Ok' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<unknown> {
    if (!isObjectIdOrHexString(id)) UsersExceptions.ObjectIdError();

    return await this.usersService.delete(id);
  }
}
