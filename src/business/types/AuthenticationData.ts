import { USER_ROLES } from "../model/User"

export interface AuthenticationData{
    id: string
    role: USER_ROLES
}