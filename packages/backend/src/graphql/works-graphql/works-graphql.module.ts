import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Work } from 'src/entities/works.entity';

import { WorkDTO } from './works-graphql.dto';

@Module({
  imports: [
    TypeOrmModule.forFeature([Work]),
    NestjsQueryGraphQLModule.forFeature({
      // import the NestjsQueryTypeOrmModule to register the entity with typeorm
      // and provide a QueryService
      imports: [NestjsQueryTypeOrmModule.forFeature([Work])],
      // describe the resolvers you want to expose
      resolvers: [{ DTOClass: WorkDTO, EntityClass: Work }],
    }),
  ],
  exports: [TypeOrmModule],
})
export class WorkGraphqlModule {}
