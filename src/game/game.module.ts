import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Award, AwardSchema } from 'src/models/award.model';
import { Game, GameSchema } from 'src/models/game.model';
import { GameRequest, GameRequestSchema } from 'src/models/gameRequest.model';
import { Task, TaskSchema } from 'src/models/task.model';
import { GameController } from './game.controller';
import { GameService } from './game.service';

@Module({
  controllers: [GameController],
  providers: [GameService],
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        connectionName: 'game_module_con',
        uri: configService.get('LOTTERY_DB_URL'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    MongooseModule.forFeature([{ name: GameRequest.name, schema: GameRequestSchema }]),
    MongooseModule.forFeature([{ name: Award.name, schema: AwardSchema }]),
  ],
})
export class GameModule { }
