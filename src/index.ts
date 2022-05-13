import { BandBusiness } from "./business/BandBussiness";
import { Authenticator } from "./business/services/Authenticator";
import { HashManager } from "./business/services/HashManager";
import { IdGenerator } from "./business/services/IdGenerator";
import { UserBusiness } from "./business/UserBusiness";
import { app } from "./controller/app";
import { BandController } from "./controller/BandController";
import { UserController } from "./controller/UserController";
import { BandDatabase } from "./data/BandDatabase";
import { Migrations } from "./data/Migrations";
import { UserDatabase } from "./data/UserDatabase";

// User 

const userBusiness = new UserBusiness(
    new UserDatabase(),
    new Authenticator(),
    new IdGenerator(),
    new HashManager()
);

const userController = new UserController(userBusiness)

// Band 

const bandBusiness = new BandBusiness(
    new BandDatabase()
)

const bandController =new BandController(
    bandBusiness
)

app.post("/user/signup", userController.signup)

app.post("/user/login", userController.login)

app.get("/band", bandController.getBandByIdName)

//Pra criar as tabelas é só descomentar as linhas abaixo e dar npm run start/dev!
// Migrations.createTables()
//     .finally(Migrations.closeConnection)