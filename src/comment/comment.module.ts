import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { CommentsService } from './comments.service';
import { CommentResolver } from './comment.resolver';

@Module({
  imports: [PrismaModule],
  providers: [CommentsService, CommentResolver],
})
export class CommentModule {}
