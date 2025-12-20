import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcryptjs";
import { User } from "../users/user.entity";

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async onModuleInit() {
    const email = "whoiskhalid@gmail.com";
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      const password = await bcrypt.hash("qwerty12345", 10);
      const admin = this.usersRepository.create({
        email,
        password,
        admin: true,
      });
      await this.usersRepository.save(admin);
      console.log("Admin user created: whoiskhalid@gmail.com");
    } else {
      console.log("Admin user already exists");
    }
  }
}
