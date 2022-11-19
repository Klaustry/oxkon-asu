import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Contract } from 'src/entities/contract.entity';

import { ContractDTO } from './contract-graphql.dto';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contract]),
    NestjsQueryGraphQLModule.forFeature({
      // import the NestjsQueryTypeOrmModule to register the entity with typeorm
      // and provide a QueryService
      imports: [NestjsQueryTypeOrmModule.forFeature([Contract])],
      // describe the resolvers you want to expose
      resolvers: [{ DTOClass: ContractDTO, EntityClass: Contract }],
    }),
  ],
  exports: [TypeOrmModule],
})
export class ContractGraphqlModule {}
