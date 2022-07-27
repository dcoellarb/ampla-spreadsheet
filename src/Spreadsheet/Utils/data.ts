import { IData } from "../types";

export const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","AA","AB","AC","AD"];

// Build empty array
export const getDefaultData = () => {
    return new Array(100).fill(new Array(alphabet.length).fill(''));
}

// Get References Value
export const processCellValue = (cellValue: string, data: IData, proccesedCells: string[] = []): string => {
    // Regex to match cell reference pattern
    const regex = /^=([A-Z])([1-9][0-9]?|100)|(A[A-D])([1-9][0-9]?|100)$/i;
    const matches = cellValue.match(regex)
    if (matches) {
        // Check for circular refernce
        if (proccesedCells.indexOf(matches[0]) >= 0) return '⚠ ERROR';

        const row = matches[2] ? Number(matches[2]) : Number(matches[4]);
        const colLetter = matches[1] ? matches[1] : matches[3];
        const col = alphabet.indexOf(colLetter.toUpperCase());
        return processCellValue(data[row - 1][col], data, [...proccesedCells, matches[0]])
    } else {
        return cellValue
    }
}