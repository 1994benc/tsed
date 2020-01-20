import {BodyParams, Controller, Get, PathParams, Post, ProviderScope, Required, Scope, Session, Status} from "@tsed/common";
import {Returns} from "@tsed/swagger/src/decorators/returns";
import {MultipartFile} from "../../../../../packages/multipartfiles/src";
import {Docs, Hidden} from "../../../../../packages/swagger/src";
import {IUser, User, UserCreation} from "../../models/User";
import {UserService} from "../../services/UserService";

@Controller("/user")
@Scope(ProviderScope.REQUEST)
@Hidden()
@Docs("hidden")
export class UserCtrl {
  userId: string;

  constructor(public userService: UserService) {}

  @Post("/connect")
  @Status(204)
  async connect(@Session() session: Express.Session, @BodyParams("user") user: User) {
    session.user = user;
  }

  @Get("/get-connected")
  async getConnected(@Session("user") user: User): Promise<IUser> {
    return user;
  }

  @Post("/")
  @Status(201)
  @Returns(User)
  async createUser(@BodyParams() userData: UserCreation) {
    return this.userService.create(userData);
  }

  @Get("/:user")
  async testPerRequest(@PathParams("user") userId: string): Promise<any> {
    this.userService.user = userId;
    this.userId = userId;

    return new Promise((resolve, reject) => {
      if (userId === "0") {
        setTimeout(() => {
          resolve({userId, idSrv: this.userService.user, idCtrl: this.userId});
        }, 500);
      }

      if (userId === "1") {
        setTimeout(() => {
          resolve({userId, idSrv: this.userService.user, idCtrl: this.userId});
        }, 300);
      }

      if (userId === "2") {
        setTimeout(() => {
          resolve({userId, idSrv: this.userService.user, idCtrl: this.userId});
        }, 150);
      }
    });
  }

  @Post("/avatar/:username")
  test(
    @MultipartFile() myFile: Express.Multer.File,
    @Required()
    @PathParams("username")
    username: string
  ) {
    // Logic ...
  }
}
