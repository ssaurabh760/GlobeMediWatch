export interface Fundraiser {
        _id: string;
        title: string;
        description: string;
        goalAmount: number;
        currentAmount: number;
        associatedCampID: string;
        donors: string[];
}

      