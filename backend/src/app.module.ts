import { Module } from '@nestjs/common';

import { QuizzesModule } from './quizzes/quizzes.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [QuizzesModule, PrismaModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
