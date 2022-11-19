import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';

import { ObjectP } from '../../entities/objects.entity';
import { ObjectDTO } from './objects-graphql.dto';

@Module({
  imports: [
    TypeOrmModule.forFeature([ObjectP]),
    NestjsQueryGraphQLModule.forFeature({
      // import the NestjsQueryTypeOrmModule to register the entity with typeorm
      // and provide a QueryService
      imports: [NestjsQueryTypeOrmModule.forFeature([ObjectP])],
      // describe the resolvers you want to expose
      resolvers: [{ DTOClass: ObjectDTO, EntityClass: ObjectP }],
    }),
  ],
  exports: [TypeOrmModule],
})
export class ObjectGraphqlModule {}
