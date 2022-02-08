export interface Privilege {
    id?: string;

    name: string;

    tokenType: string;

    price: number;

    maxSupply?: number | null;

    maxSupplyType?: string | null;

    amountPerStudent?: number | null;

    amountPerStudentType?: string | null;

    description?: string | null;

    lifeTimeInDay?: number | null;

    imageUrl?: string | null;

    imageName?: string | null;
}