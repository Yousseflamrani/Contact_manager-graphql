import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ContactsService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('contacts')
@UseGuards(JwtAuthGuard)
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  create(
    @Body() createContactDto: CreateContactDto,
    @Request() req,
  ): Promise<{
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
  }> {
    const userId = req.user.id;
    return this.contactsService.create(userId, createContactDto);
  }

  @Get()
  findAll(@Request() req): Promise<
    {
      id: number;
      name: string;
      email: string;
      phone: string;
      address: string;
      createdAt: Date;
      updatedAt: Date;
      userId: number;
    }[]
  > {
    const userId = req.user.id;
    return this.contactsService.findAll(userId);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Request() req,
  ): Promise<{
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
  }> {
    const userId = req.user.id;
    return this.contactsService.remove(userId, +id);
  }
}
