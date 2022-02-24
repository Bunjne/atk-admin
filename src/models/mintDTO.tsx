export interface InitialMintDTO {
    TokenType: string;

    TotalUsers: number;

    Users: string[] | null;
}

export interface StudentMintDTO {
    Address: string;

    Grades: GradeMintDTO[] | null;
}

export interface GradeMintDTO {
    grade: string;

    count: number;
}