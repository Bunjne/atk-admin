export enum MintType {
    SEMESTERLY = "SEMESTERLY",
    VOTE = "VOTE",
    LECTURER = "LECTURER",
    ORGANIZATION = "ORGANIZATION"
}

export function GetMintType(type: number): string {
    if (type === 1) {
        return MintType.SEMESTERLY
    } else if (type === 2) {
        return MintType.VOTE
    } else if (type === 3) {
        return MintType.LECTURER
    } else if (type === 4) {
        return MintType.ORGANIZATION
    }

    return ""
}