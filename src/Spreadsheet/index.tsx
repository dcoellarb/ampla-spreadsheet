import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { alphabet, getDefaultData, processCellValue } from "./Utils/data";
import * as S from './style';
import { IData, ISelectedCell } from "./types";
import { useParams } from "react-router-dom";

function Spreadsheet() {
    const [data, setData] = useState<IData>(getDefaultData())
    const [selectedCell, setSelectedCell] = useState<ISelectedCell>()
    const [selectedCellValue, setSelectedCellValue] = useState<string>('')
    const [linkId, setLinkId] = useState<string>()
    const [linkCopied, setLinkCopied] = useState<boolean>(false)
    
    const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    
    let { spreadsheetId } = useParams();

    // Load from spreadsheetId on url
    useEffect(() => {
        if (spreadsheetId) {
            const localData = localStorage.getItem(spreadsheetId);
            if (localData) setData(JSON.parse(localData));
            setLinkId(spreadsheetId)
        }
    }, [spreadsheetId])

    // Update state with changes
    const saveCellValue = () => {
        if(selectedCell){
         
          // Update state
          const rowIndex = selectedCell?.row;
          const cellIndex = selectedCell?.column;
          const updaedData = [
            ...data.slice(0, rowIndex),
            [
                ...data[rowIndex].slice(0, cellIndex),
                selectedCellValue,
                ...data[rowIndex].slice(cellIndex + 1)
            ],
            ...data.slice(rowIndex + 1)
          ];
          setData(updaedData)
          
          // Clear Selected cell
          setSelectedCell(undefined);

          // Update localstorage
          if (linkId) localStorage.setItem(linkId, JSON.stringify(updaedData));
        }
    }

    /* Handler methods */

    const onSelectCell = (rowIndex: number, cellIndex: number) => {
        setSelectedCell({row: rowIndex, column: cellIndex})
        setSelectedCellValue(data[rowIndex][cellIndex] ? data[rowIndex][cellIndex] : '')
        setTimeout(() => {
            inputRef?.current?.focus();
        }, 300)
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedCellValue(e.target.value);
    }

    const onGenerateLink = () => {
        const id = uuidv4();
        localStorage.setItem(id, JSON.stringify(data));
        setLinkId(id);
    }

    /* Rendering methods */

    const renderCell = (cellValue: string, rowIndex: number, cellIndex: number) => {
        const processedCellValue = processCellValue(cellValue, data);
        const hasError = processedCellValue === '⚠ ERROR';

        return (
            <S.Cell
                key={cellIndex}
                onClick={() => onSelectCell(rowIndex, cellIndex)}
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
                        <S.TooltipText className="tooltiptext">Circular Refrence Found!</S.TooltipText>
                    }
                </S.CellContainer>
            </S.Cell>
        );
    }

    const url = linkId ? `http://localhost:3000/spreadsheets/${linkId}` : undefined
    return (
      <S.Root>
        <S.Header>
            {!linkId &&
                <S.GenerateLinkButton onClick={onGenerateLink}>Generate link</S.GenerateLinkButton>            
            }
            {linkId &&
                <>
                    <S.LinkLabel>Spreedsheet Link:</S.LinkLabel>
                    <S.LinkText href={url} target="_blank">{url}</S.LinkText>
                    <S.GenerateLinkButton
                        onClick={() => {
                            url && navigator.clipboard.writeText(url);
                            setLinkCopied(true);
                        }}
                    >{linkCopied ? 'Copied!' : 'Copy'}</S.GenerateLinkButton>            
                </>
            }
        </S.Header>
        <S.Table>
            <S.TableHeader>
                <S.HeaderRow>
                    <S.HeaderColumnCell key='headerRowCell'/>
                    {alphabet.map((letter) => (
                        <S.HeaderColumnCell key={letter}>{letter}</S.HeaderColumnCell>
                    ))}
                </S.HeaderRow>
            </S.TableHeader>
            <S.TableBody>
                {data.map((row, rowIndex) => (
                    <S.Row key={rowIndex + 1}>
                        <S.HeaderRowCell>{rowIndex + 1}</S.HeaderRowCell>
                        {row.map((cellValue, cellIndex) => renderCell(cellValue, rowIndex, cellIndex))}
                    </S.Row>
                ))}
            </S.TableBody>
        </S.Table>
      </S.Root>
    );
  }
  
  export default Spreadsheet;