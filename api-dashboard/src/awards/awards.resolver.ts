import { faker } from '@faker-js/faker';
import { Query, Resolver } from '@nestjs/graphql';
import { EmployeeOfMonth } from './model/employee-of-month.model';

@Resolver(() => EmployeeOfMonth)
export class AwardsResolver {
  @Query(() => EmployeeOfMonth)
  async employeeOfMonth() {
    return {
      id: faker.datatype.uuid(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    };
  }
}
