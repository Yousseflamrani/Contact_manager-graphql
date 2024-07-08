import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateContactDto {
  @Field()
  name: string;

  @Field()
  phone: string;

  @Field()
  email: string;

  @Field()
  address: string;
}
