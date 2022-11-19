import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { ContentModule } from './content/content.module';
import { CourseModule } from './course/course.module';
import { ContractGraphqlModule } from './graphql/contract-graphql/contract-graphql.module';
import { ObjectGraphqlModule } from './graphql/objects-graphql/objects-graphql.module';
import { WorkGraphqlModule } from './graphql/works-graphql/works-graphql.module';
import { ObjectModule } from './objects/objects.module';
import { StatsModule } from './stats/stats.module';
import { UserModule } from './user/user.module';
import { WorkModule } from './works/works.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      // set to true to automatically generate schema
      // subscriptions: {
      //   'graphql-ws': true,
      //   'subscriptions-transport-ws': true,
      // },
      driver: ApolloDriver,
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
    }),
    UserModule,
    AuthModule,
    CourseModule,
    ContentModule,
    StatsModule,
    ObjectModule,
    WorkModule,
    //Graphql modules
    ObjectGraphqlModule,
    WorkGraphqlModule,
    ContractGraphqlModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
