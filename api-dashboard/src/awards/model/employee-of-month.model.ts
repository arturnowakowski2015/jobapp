import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EmployeeOfMonth {
  @Field()
  id: string;

  @Field()
  firstName: string;

  @Field({ nullable: true })
  lastName: string;
}
