import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContactsExceptions } from './contacts.exceptions';
import {
  ContactDTO,
  CreateContactDTO,
  UpdateContactDTO,
} from './dto/contact.dto';
import { Contact, ContactDocument } from './entity/contact.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact.name)
    private readonly contactsRepository: Model<ContactDocument>,
  ) {}
  async findAll(): Promise<unknown> {
    return await this.contactsRepository.find();
  }

  async findById(id: string): Promise<Partial<ContactDTO>> {
    const contact = await this.contactsRepository.findById(id);
    if (!contact) ContactsExceptions.NotFoundError();

    return contact;
  }

  async create(body: CreateContactDTO): Promise<Partial<ContactDTO>> {
    const contact = await this.contactsRepository.create(body);

    return contact;
  }

  async update(
    id: string,
    body: UpdateContactDTO,
  ): Promise<Partial<ContactDTO>> {
    const contact = await this.contactsRepository.updateOne({ _id: id }, body);
    if (!contact) ContactsExceptions.NotFoundError();

    return await this.findById(id);
  }

  async delete(id: string): Promise<any> {
    return await this.contactsRepository.deleteOne({ _id: id });
  }
}
