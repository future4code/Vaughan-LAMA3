export enum USER_ROLES {
    ADMIN = "ADMIN",
    NORMAL = "NORMAL"
}

export class User {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private role: USER_ROLES
    ) { }

    public getId(){
        return this.id
    }

    public getName(){
        return this.name
    }

    public getEmail(){
        return this.email
    }

    public getPassword(){
        return this.password
    }

    public getRole(){
        return this.role
    }
};

export const stringToUserRole = (input: string): USER_ROLES => {
    switch (input) {
       case "NORMAL":
          return USER_ROLES.NORMAL;
       case "ADMIN":
          return USER_ROLES.ADMIN;
       default:
          throw new Error("Invalid user role");
    }
 };