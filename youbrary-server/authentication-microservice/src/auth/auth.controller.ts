import { Body, Controller, Get, Logger, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiRequestTimeoutResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { Provider } from './constants';
import { User } from './dto/user.dto';
import { GoogleGuard } from './guards/google.guard';
import { LocalGuard } from './guards/local.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  private readonly logger = new Logger("Auth Controller");

  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({type: [User]})
  @ApiResponse({ status: 200, description: 'JWT Authentication Token', type: String })
  async login(@Request() req) {
    this.logger.log("login method called");

    return await this.authService.createToken(req.user.email, Provider.LOCAL)
           .catch((exception) => { return exception });
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a user' })
  @ApiBody({type: [User]})
  async register(@Body() userDto: User) {
    this.logger.log("register method called");

    return await this.authService.register(userDto)
                 .catch((exception) => { return exception });
  }

  @Get('google')
  @UseGuards(GoogleGuard)
  @ApiOperation({ summary: 'Start Google authentication flow' })
  googleLogin(){
    this.logger.log("google login method called");
  }

  @Get('google/callback')
  @UseGuards(GoogleGuard)
  @ApiOperation({ summary: 'Google redirect callback' })
  googleLoginCallback(@Req() req, @Res() res)
  {
    this.logger.log("google login callback method called");
    
    const token: string = req.user.access_token;
    const userEmail = req.user.userEmail;

    if (token)
    {
      this.authService.addGoogleUser(userEmail);
      res.redirect('http://localhost:4200/login/google/success?token=' + token + '&email=' + userEmail);
    }
    else 
        res.redirect('http://localhost:4200/login/google/failure');
  }
}