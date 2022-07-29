import React, { useRef } from "react";
import * as S from './../style';
import { ICellProps } from "../types";

const MemoizedCell = React.memo(function Cell({ 
    rowIndex,
    cellValue,
    cellIndex,
    selectedCell,
    selectedCellValue,
    setSelectedCellValue,
    onSelectCell,
    saveCellValue
}: ICellProps) {
    
    const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedCellValue(e.target.value);
    }

    const hasError = cellValue === '⚠ ERROR';

    /* Rendering methods */
    console.log('render cell')
    return (
        <S.Cell
            key={cellIndex}
            onClick={() => {
                onSelectCell(rowIndex, cellIndex)
                setTimeout(() => {
                    inputRef.current && inputRef.current.focus();
                }, 400)
            }}
            selected={selectedCell?.row === rowIndex && selectedCell?.column === cellIndex}
        >
            <S.CellContainer className={hasError ? 'tooltip' : ''}>
                {(selectedCell?.row === rowIndex && selectedCell?.column === cellIndex)
                    ? <input
                        ref={inputRef}
                        type="string"
                        value={selectedCellValue}
                        onChange={onInputChange}
                        onKeyPress={(e) => e.key === 'Enter' ? saveCellValue() : undefined}
                        onBlur={saveCellValue}
                        />
                    : cellValue
                }
                {hasError &&
                    <S.TooltipText className="tooltiptext">Circular Reference Found!</S.TooltipText>
                }
            </S.CellContainer>
        </S.Cell>
    );
  }, (prevProps: ICellProps, nextProps: ICellProps) => {
    const isSameData = prevProps.cellValue === nextProps.cellValue;
    const isStillSelected =
        prevProps.selectedCell !== undefined && prevProps.selectedCell.row === prevProps.rowIndex && prevProps.selectedCell.column === prevProps.cellIndex && // If i was selected 
        nextProps.selectedCell !== undefined && nextProps.selectedCell.row === nextProps.rowIndex && nextProps.selectedCell.column === nextProps.cellIndex // and still am
    const isStillNotSelected =
        (!prevProps.selectedCell || prevProps.selectedCell.row !== prevProps.rowIndex || prevProps.selectedCell.column !== prevProps.cellIndex) && // If i was not selected 
        (!nextProps.selectedCell || nextProps.selectedCell.row !== nextProps.rowIndex || nextProps.selectedCell.column !== nextProps.cellIndex) // and still not
    const isSameSelectionState = isStillSelected || isStillNotSelected;
    const isInputValueNotChange = prevProps.selectedCellValue === nextProps.selectedCellValue; // selected cell value changed
    const isInputNotChanged = isStillNotSelected || (isStillSelected && isInputValueNotChange); // not selected or if selected value is the same
    const isEqual = isSameData && isSameSelectionState && isInputNotChanged;
    return isEqual;
  });
  
  export default MemoizedCell;