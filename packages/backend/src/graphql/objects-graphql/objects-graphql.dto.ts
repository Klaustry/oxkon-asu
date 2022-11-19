import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  FilterableOffsetConnection,
  FilterableUnPagedRelation,
  IDField,
  PagingStrategies,
  QueryOptions,
  UnPagedRelation,
} from '@nestjs-query/query-graphql';
import { WorkDTO } from 'src/graphql/works-graphql/works-graphql.dto';

import { ContractDTO } from '../contract-graphql/contract-graphql.dto';
// import { UserDTO } from 'src/user-graphql/dto/user.dto';

@ObjectType('Object')
// @Relation('user', () => UserDTO)
// @FilterableOffsetConnection('works', () => WorkDTO, {
//   disableRemove: true,
//   enableTotalCount: true,
// })
@QueryOptions({
  pagingStrategy: PagingStrategies.OFFSET,
  enableTotalCount: true,
  maxResultsSize: 100,
})
//@QueryOptions({ pagingStrategy: PagingStrategies.NONE })
@FilterableOffsetConnection('works', () => WorkDTO, {
  disableRemove: true,
  allowFiltering: true,
})
export class ObjectDTO {
  @FilterableField(() => ID)
  id!: number;
  @FilterableField({ nullable: true })
  address: string;
  @FilterableField({ nullable: true })
  region: string;
  //   @FilterableField({ nullable: true })
  //   description!: string;
  //   @FilterableField({ nullable: true })
  //   symbol!: string;
  //   @FilterableField()
  //   account_id!: string;
  //   @FilterableField({ nullable: true })
  //   creator!: string;
  //   @FilterableField({ nullable: true })
  //   price!: string;
  //   @FilterableField({ nullable: true })
  //   max_mint!: string;
  //   @FilterableField({ nullable: true })
  //   userId!: string;
  //   @FilterableField({ nullable: true })
  //   user!: string;
  //   @FilterableField({ nullable: true })
  //   status!: string;
}
