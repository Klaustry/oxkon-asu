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
  FilterableOffsetConnection,
  FilterableUnPagedRelation,
  IDField,
  PagingStrategies,
  QueryOptions,
  Relation,
  UnPagedRelation,
} from '@nestjs-query/query-graphql';
import { ObjectDTO } from 'src/graphql/objects-graphql/objects-graphql.dto';

import { ContractDTO } from '../contract-graphql/contract-graphql.dto';
//const { GraphQLJSON } = require('graphql-type-json');

@ObjectType('Work')
@Relation('Object', () => ObjectDTO, { disableRemove: true })
@FilterableOffsetConnection('contract', () => ContractDTO, {
  disableRemove: true,
})
//@QueryOptions({ pagingStrategy: PagingStrategies.NONE })
// @FilterableUnPagedRelation('Contract', () => ContractDTO, {
//   disableRemove: true,
// })
@QueryOptions({
  pagingStrategy: PagingStrategies.OFFSET,
  enableTotalCount: true,
  maxResultsSize: 20,
})
export class WorkDTO {
  @FilterableField(() => ID)
  id!: number;

  @FilterableField()
  work_id!: number;

  @FilterableField({ nullable: true })
  work_name!: string;

  @FilterableField({ nullable: true })
  contract_short!: string;

  @FilterableField({ nullable: true })
  plan_year: number;

  @FilterableField({ nullable: true })
  progress_id: number;

  @FilterableField({ nullable: true })
  progress_name: string;

  @FilterableField({ nullable: true })
  progress: number;

  @FilterableField({ nullable: true })
  obj_id: string;

  @FilterableField({ nullable: true })
  old_obj_id: string;

  @FilterableField()
  ObjectId!: string;
}
