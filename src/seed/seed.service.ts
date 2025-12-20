import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcryptjs";
import { User } from "../users/user.entity";

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private configService: ConfigService
  ) {}

  async onModuleInit() {
    const email = this.configService.get<string>("ADMIN_EMAIL");
    const password = this.configService.get<string>("ADMIN_PASSWORD");

    if (!email || !password) {
      return;
    }

    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const admin = this.usersRepository.create({
        email,
        password: hashedPassword,
        admin: true,
      });
      await this.usersRepository.save(admin);
      console.log("Admin user created");
    } else {
      console.log("Admin user already exists");
    }
  }
}
