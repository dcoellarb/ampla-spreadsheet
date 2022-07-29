import React from "react";

export type IData = Array<Array<string>>;

export interface ISelectedCell {
    row: number;
    column: number;
}

export interface IHeaderProps {
    linkId?: string;
    onGenerateLink: () => void;
}

export interface IRowProps {
    rowIndex: number;
    row: Array<string>;
    selectedCell?: ISelectedCell;
    selectedCellValue: string;
    setSelectedCellValue: React.Dispatch<React.SetStateAction<string>>;
    onSelectCell: (rowIndex: number, cellIndex: number) => void;
    saveCellValue: () => void;
}
export interface ICellProps {
    rowIndex: number;
    cellValue: string;
    cellIndex: number;
    selectedCell?: ISelectedCell;
    selectedCellValue: string;
    setSelectedCellValue: React.Dispatch<React.SetStateAction<string>>;
    onSelectCell: (rowIndex: number, cellIndex: number) => void;
    saveCellValue: () => void;
}