import { Authenticator } from "./business/services/Authenticator";
import { HashManager } from "./business/services/HashManager";
import { IdGenerator } from "./business/services/IdGenerator";
import { UserBusiness } from "./business/UserBusiness";
import { app } from "./controller/app";
import { UserController } from "./controller/UserController";
import { Migrations } from "./data/Migrations";
import { UserDatabase } from "./data/UserDatabase";

const userBusiness = new UserBusiness(
    new UserDatabase(),
    new Authenticator(),
    new IdGenerator(),
    new HashManager()
);

const userController = new UserController(userBusiness)

app.post("/user/signup", userController.signup)

app.post("/user/login", userController.login)

//Pra criar as tabelas é só descomentar as linhas abaixo e dar npm run start/dev!
// Migrations.createTables()
//     .finally(Migrations.closeConnection)