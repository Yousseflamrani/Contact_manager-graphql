import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Comment } from './entities/comment.entity';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Mutation(() => Comment)
  @UseGuards(JwtAuthGuard)
  createComment(
    @Context() context,
    @Args('createCommentDto') createCommentDto: CreateCommentDto,
  ) {
    const userId = context.req.user.id;
    return this.commentsService.create(userId, createCommentDto);
  }

  @Query(() => [Comment])
  @UseGuards(JwtAuthGuard)
  findAllComments(@Context() context) {
    const userId = context.req.user.id;
    return this.commentsService.findAll(userId);
  }

  @Mutation(() => Comment)
  @UseGuards(JwtAuthGuard)
  updateComment(
    @Context() context,
    @Args('updateCommentDto') updateCommentDto: UpdateCommentDto,
  ) {
    const userId = context.req.user.id;
    const id = updateCommentDto.id;
    return this.commentsService.update(userId, id, updateCommentDto);
  }

  @Mutation(() => Comment)
  @UseGuards(JwtAuthGuard)
  removeComment(@Context() context, @Args('id') id: number) {
    const userId = context.req.user.id;
    return this.commentsService.remove(userId, id);
  }
}
