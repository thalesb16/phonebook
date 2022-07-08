import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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
import { ContactsExceptions } from './contacts.exceptions';
import { ContactsService } from './contacts.service';
import {
  ContactDTO,
  CreateContactDTO,
  UpdateContactDTO,
} from './dto/contact.dto';

@ApiForbiddenResponse({ description: 'Forbidden. ' })
@ApiBadRequestResponse({ description: 'Bad Request.' })
@ApiUnauthorizedResponse({ description: 'Unauthorized.' })
@ApiTags('contacts')
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @ApiOperation({ summary: 'List all contacts' })
  @ApiOkResponse({ description: 'Ok', type: [ContactDTO] })
  @Get()
  async get(): Promise<unknown> {
    return await this.contactsService.findAll();
  }

  @ApiOperation({ summary: 'Get a contact' })
  @ApiOkResponse({ description: 'Ok', type: ContactDTO })
  @Get(':id')
  async getById(@Param('id') id: string): Promise<Partial<ContactDTO>> {
    if (!isObjectIdOrHexString(id)) ContactsExceptions.ObjectIdError();

    return await this.contactsService.findById(id);
  }

  @ApiOperation({ summary: 'Create contact' })
  @ApiOkResponse({ status: 201, description: 'Ok', type: ContactDTO })
  @Post()
  async post(@Body() body: CreateContactDTO): Promise<Partial<ContactDTO>> {
    return await this.contactsService.create(body);
  }

  @ApiOperation({ summary: 'Update ontact' })
  @ApiOkResponse({ description: 'Ok', type: ContactDTO })
  @Put(':id')
  async put(
    @Param('id') id: string,
    @Body() body: UpdateContactDTO,
  ): Promise<Partial<ContactDTO>> {
    if (!isObjectIdOrHexString(id)) ContactsExceptions.ObjectIdError();

    return await this.contactsService.update(id, body);
  }

  @ApiOperation({ summary: 'Delete contact' })
  @ApiOkResponse({ description: 'Ok' })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<unknown> {
    if (!isObjectIdOrHexString(id)) ContactsExceptions.ObjectIdError();

    return await this.contactsService.delete(id);
  }
}
