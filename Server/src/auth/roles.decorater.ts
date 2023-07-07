import { SetMetadata } from "@nestjs/common";
import { Role } from "./models/roles.enum";
import { ROLES_KEYS } from "./constants";

export const Roles = ( ...roles:Role[]) => SetMetadata(ROLES_KEYS, roles);