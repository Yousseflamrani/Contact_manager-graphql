import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, createContactDto: CreateContactDto) {
    return this.prisma.contact.create({
      data: {
        ...createContactDto,
        userId: userId,
      },
    });
  }

  async findAll(userId: number) {
    return this.prisma.contact.findMany({
      where: { userId: userId },
    });
  }

  async findOne(userId: number, id: number) {
    const contact = await this.prisma.contact.findUnique({
      where: { id: id, userId: userId },
    });

    if (!contact) {
      throw new NotFoundException(`Contact #${id} not found`);
    }

    return contact;
  }

  async update(userId: number, id: number, updateContactDto: UpdateContactDto) {
    const contact = await this.prisma.contact.findUnique({
      where: { id: id, userId: userId },
    });

    if (!contact) {
      throw new NotFoundException(`Contact #${id} not found`);
    }

    return this.prisma.contact.update({
      where: { id: id },
      data: { ...updateContactDto },
    });
  }

  async remove(userId: number, id: number) {
    const contact = await this.prisma.contact.findUnique({
      where: { id: id, userId: userId },
    });

    if (!contact) {
      throw new NotFoundException(`Contact #${id} not found`);
    }

    return this.prisma.contact.delete({
      where: { id: id },
    });
  }
}
