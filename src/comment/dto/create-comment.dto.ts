import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCommentDto {
  @Field()
  content: string;

  @Field()
  contactId: number;
}
