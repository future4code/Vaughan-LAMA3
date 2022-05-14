import { BandBusiness } from "./business/BandBussiness";
import { Authenticator } from "./business/services/Authenticator";
import { HashManager } from "./business/services/HashManager";
import { IdGenerator } from "./business/services/IdGenerator";
import { ShowBusiness } from "./business/ShowBusiness";
import { UserBusiness } from "./business/UserBusiness";
import { app } from "./controller/app";
import { BandController } from "./controller/BandController";
import { ShowController } from "./controller/ShowController";
import { UserController } from "./controller/UserController";
import { BandDatabase } from "./data/BandDatabase";
import { ShowDatabase } from "./data/ShowDatabase";
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
    new BandDatabase(),
    new IdGenerator(),
    new Authenticator()
)

const bandController = new BandController(
    bandBusiness
)

// Show 

const showBusiness  = new ShowBusiness(
    new ShowDatabase(), 
    new IdGenerator()
)

const showController = new ShowController(
    showBusiness
)

app.post("/user/signup", userController.signup)

app.post("/user/login", userController.login)

app.post("/band", bandController.signingBand)

app.get("/band", bandController.getBandByIdName)

app.post("/show/sign", showController.signShow)

app.get("/show/shows", showController.gettingShowByDate)