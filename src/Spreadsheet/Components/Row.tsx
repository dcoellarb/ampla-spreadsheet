import React, { useRef } from "react";
import * as S from '../style';
import { IRowProps } from "../types";
import Cell from './Cell';

const MemoizedRow = React.memo(function Row({ 
    rowIndex,
    row,
    selectedCell,
    selectedCellValue,
    setSelectedCellValue,
    onSelectCell,
    saveCellValue
}: IRowProps) {
    /* Rendering methods */
    console.log('render row')
    return (
        <S.Row key={rowIndex + 1}>
            <S.HeaderRowCell>{rowIndex + 1}</S.HeaderRowCell>
            {row.map((cellValue, cellIndex) => (
                <Cell
                    key={cellIndex}
                    cellValue={cellValue}
                    rowIndex={rowIndex}
                    cellIndex={cellIndex}
                    selectedCell={selectedCell}
                    selectedCellValue={selectedCellValue}
                    setSelectedCellValue={setSelectedCellValue}
                    onSelectCell={onSelectCell}
                    saveCellValue={saveCellValue}
                />
            ))}
        </S.Row>
    );
  }, (prevProps: IRowProps, nextProps: IRowProps) => {
    const isSameData = JSON.stringify(prevProps.row) === JSON.stringify(nextProps.row);
    const isStillSelected =
        prevProps.selectedCell !== undefined && prevProps.selectedCell.row === prevProps.rowIndex && // If i was selected 
        nextProps.selectedCell !== undefined && nextProps.selectedCell.row === nextProps.rowIndex; // and still am
    const isStillNotSelected =
        (!prevProps.selectedCell || prevProps.selectedCell.row !== prevProps.rowIndex) && // If i was not selected 
        (!nextProps.selectedCell || nextProps.selectedCell.row !== nextProps.rowIndex) // and still not
    const isSameSelectionState = isStillSelected || isStillNotSelected;
    const isInputValueNotChange = prevProps.selectedCellValue === nextProps.selectedCellValue; // selected cell value changed
    const isInputNotChanged = isStillNotSelected || (isStillSelected && isInputValueNotChange);
    const isEqual = isSameData && isSameSelectionState && isInputNotChanged; // not selected or if selected value is the same
    return isEqual;
  }
);
  
  export default MemoizedRow;