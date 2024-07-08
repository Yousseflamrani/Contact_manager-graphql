import { Module } from '@nestjs/common';
import { ContactsService } from './contact.service';
import { ContactResolver } from './contact.resolver';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ContactsService, ContactResolver],
})
export class ContactModule {}
