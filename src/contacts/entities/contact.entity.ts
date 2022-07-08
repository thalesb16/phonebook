import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContactDocument = Contact & Document;

@Schema({
  timestamps: true,
})
export class Contact {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  group: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
