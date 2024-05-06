// Enum defining user roles
export enum ROLES {
    GENERAL = "general",
    ORGANIZATION = "organization",
    ADMIN = "admin",
    VOLUNTEER = "volunteer"
}

// Interface defining the User object
export interface User {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: keyof typeof ROLES;
    createdAt: Date;
    updatedAt: Date;
}
