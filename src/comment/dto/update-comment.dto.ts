import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateCommentDto } from './create-comment.dto';

@InputType()
export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @Field(() => Int)
  id: number;
}
