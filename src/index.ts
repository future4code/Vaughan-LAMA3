import { server, app } from "./controller/app";
import { Migrations } from "./data/Migrations";

server


//Pra criar as tabelas é só descomentar as linhas abaixo e dar npm run start/dev!
// Migrations.createTables()
//     .finally(Migrations.closeConnection)