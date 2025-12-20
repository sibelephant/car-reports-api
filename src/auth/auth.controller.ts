import { Controller, Post, Get, Body, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { CreateUserDto, SignInDto } from "./dtos/auth.dto";
import { CurrentUser } from "../decorators/current-user.decorator";
import { User } from "../users/user.entity";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Post("signin")
  signin(@Body() signInDto: SignInDto) {
    return this.authService.signin(signInDto);
  }

  @Post("logout")
  logout() {
    return { message: "Logged out successfully" };
  }

  @Post("signout")
  signout() {
    return { message: "Signed out successfully" };
  }

  @Get("whoami")
  @UseGuards(AuthGuard("jwt"))
  whoami(@CurrentUser() user: User) {
    return user;
  }
}
