export enum MintType {
    INITIAL = "INITIAL",
    VOTE = "VOTE",
    TEACHER = "TEACHER",
    CLUB = "CLUB"
}

export function GetMintType(type: number): string {
    if (type === 1) {
        return MintType.INITIAL
    } else if (type === 2) {
        return MintType.VOTE
    } else if (type === 3) {
        return MintType.TEACHER
    } else if (type === 4) {
        return MintType.CLUB
    }

    return ""
}