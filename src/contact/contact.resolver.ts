import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { ContactsService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Contact } from './entities/contact.entity';

@Resolver()
export class ContactResolver {
  constructor(private readonly contactService: ContactsService) {}

  @Mutation(() => Contact)
  @UseGuards(JwtAuthGuard)
  createContact(
    @Context() context,
    @Args('createContactDto') createContactDto: CreateContactDto,
  ) {
    const userId = context.req.user.id;
    return this.contactService.create(userId, createContactDto);
  }

  @Query(() => [Contact])
  @UseGuards(JwtAuthGuard)
  findAll(@Context() context) {
    const userId = context.req.user.id;
    return this.contactService.findAll(userId);
  }

  @Mutation(() => Contact)
  @UseGuards(JwtAuthGuard)
  updateContact(
    @Context() context,
    @Args('updateContactDto') updateContactDto: UpdateContactDto,
  ) {
    const userId = context.req.user.id;
    const id = updateContactDto.id;
    return this.contactService.update(userId, id, updateContactDto);
  }

  @Mutation(() => Contact)
  @UseGuards(JwtAuthGuard)
  removeContact(@Context() context, @Args('id') id: number) {
    const userId = context.req.user.id;
    return this.contactService.remove(userId, id);
  }
}
