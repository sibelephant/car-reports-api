import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { ReportsModule } from "./reports/reports.module";
import { SeedModule } from "./seed/seed.module";
import { User } from "./users/user.entity";
import { Report } from "./reports/report.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "sqlite",
        database: configService.get<string>("DATABASE_NAME"),
        entities: [User, Report],
        synchronize: true,
      }),
    }),
    AuthModule,
    ReportsModule,
    SeedModule,
  ],
})
export class AppModule {}
