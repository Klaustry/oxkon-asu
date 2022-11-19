import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { ObjectModule } from './objects/objects.module';
import { UserModule } from './user/user.module';
import { WorkModule } from './works/works.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(),
    // GraphQLModule.forRoot({
    //   // set to true to automatically generate schema
    //   // subscriptions: {
    //   //   'graphql-ws': true,
    //   //   'subscriptions-transport-ws': true,
    //   // },
    //   driver: ApolloDriver,
    //   autoSchemaFile: true,
    //   installSubscriptionHandlers: true,
    // }),
    UserModule,
    AuthModule,
    // StatsModule,
    ObjectModule,
    WorkModule,
    //Graphql modules
    //ObjectGraphqlModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
