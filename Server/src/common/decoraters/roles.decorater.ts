import { SetMetadata } from "@nestjs/common";
import { Role } from "../../auth/interfaces/roles.enum";  
 
export const Roles = ( ...roles:Role[]) => SetMetadata(process.env.ROLES_KEYS, roles);