// Interface defining the Health Organization object
export interface HealthOrganization {
    _id: string;
    organizationName: string;
    services: string;
    description: string;
    camps: string;
    location: string;
    date: Date;
}