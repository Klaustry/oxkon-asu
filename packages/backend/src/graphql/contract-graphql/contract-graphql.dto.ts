import {
  Field,
  Float,
  GraphQLISODateTime,
  ID,
  Int,
  ObjectType,
} from '@nestjs/graphql';
import {
  FilterableField,
  IDField,
  PagingStrategies,
  QueryOptions,
  Relation,
  UnPagedRelation,
} from '@nestjs-query/query-graphql';
import { WorkDTO } from 'src/graphql/works-graphql/works-graphql.dto';
//const { GraphQLJSON } = require('graphql-type-json');

@ObjectType('Contract')
@Relation('works', () => WorkDTO, { disableRemove: true })
//@QueryOptions({ pagingStrategy: PagingStrategies.NONE })
@QueryOptions({
  pagingStrategy: PagingStrategies.OFFSET,
  enableTotalCount: true,
  maxResultsSize: -1,
})
export class ContractDTO {
  @FilterableField(() => ID)
  id!: number;

  @FilterableField()
  short_name!: number;

  @FilterableField({ nullable: true })
  name: string;

  @FilterableField({ nullable: true })
  archive!: boolean;

  @FilterableField({ nullable: true })
  contactor!: string;

  @FilterableField({ nullable: true })
  description: string;
}
