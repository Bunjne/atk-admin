export enum TokenType {
    ACADEMIC = "ACADEMIC",
    LIFESTYLE = "LIFESTYLE"
}

export function GetTokenType(type: string): string {
    if (type.toLocaleLowerCase() == "academic") {
        return TokenType.ACADEMIC
    } else if (type.toLocaleLowerCase() == "lifestyle") {
        return TokenType.LIFESTYLE
    }

    return ""
} 

export function GetTokenTypeSymbol(type: string): string {
    if (type.toLocaleLowerCase() == "academic") {
        return "ACA"
    } else if (type.toLocaleLowerCase() == "lifestyle") {
        return "LIF"
    }

    return ""
} 