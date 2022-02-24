export interface Token {
    id: string;

    name: string;

    symbol: string;
     
    logo?: string|null;

    totalSupply: number;

    cirCulationSupply: number;

    description?: string|null;

    price: number;

    priceUpdatedAt: string;
}