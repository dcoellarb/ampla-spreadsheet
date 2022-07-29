import React, { useEffect, useRef } from "react";
import { processCellValue } from "./../Utils/data";
import * as S from './../style';
import { ICellProps } from "../types";

function Spreadsheet({ 
    data,
    rowIndex,
    cellIndex,
    cellValue,
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

    const processedCellValue = processCellValue(cellValue, data);
    const hasError = processedCellValue === '⚠ ERROR';

    /* Rendering methods */
    return (
        <S.Cell
            key={cellIndex}
            onClick={() => {
                onSelectCell(rowIndex, cellIndex)
                setTimeout(() => {
                    inputRef.current.focus();
                }, 300)
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
                    : processedCellValue
                }
                {hasError &&
                    <S.TooltipText className="tooltiptext">Circular Reference Found!</S.TooltipText>
                }
            </S.CellContainer>
        </S.Cell>
    );
  }
  
  export default Spreadsheet;