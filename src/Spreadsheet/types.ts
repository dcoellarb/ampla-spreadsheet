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

export interface ICellProps {
    data: IData;
    rowIndex: number;
    cellIndex: number;
    cellValue: string;
    selectedCell?: ISelectedCell;
    selectedCellValue: string;
    setSelectedCellValue: React.Dispatch<React.SetStateAction<string>>;
    onSelectCell: (rowIndex: number, cellIndex: number) => void;
    saveCellValue: () => void;
}