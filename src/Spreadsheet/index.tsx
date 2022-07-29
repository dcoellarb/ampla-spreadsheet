import { useEffect, useState } from "react";
import Header from './Components/Header';
import Cell from './Components/Cell'
import { alphabet, getDefaultData } from "./Utils/data";
import * as S from './style';
import { IData, ISelectedCell } from "./types";
import { useParams } from "react-router-dom";

function Spreadsheet() {
    const [data, setData] = useState<IData>(getDefaultData())
    const [selectedCell, setSelectedCell] = useState<ISelectedCell>()
    const [selectedCellValue, setSelectedCellValue] = useState<string>('')
        
    let { spreadsheetId } = useParams();

    // Load from spreadsheetId on url
    useEffect(() => {
        if (spreadsheetId) {
            const localData = localStorage.getItem(spreadsheetId);
            if (localData) setData(JSON.parse(localData));
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
        }
    }

    /* Handler methods */

    const onSelectCell = (rowIndex: number, cellIndex: number) => {
        setSelectedCell({row: rowIndex, column: cellIndex})
        setSelectedCellValue(data[rowIndex][cellIndex] ? data[rowIndex][cellIndex] : '')
    }

    const onGenerateLink = (id: string) => {
        localStorage.setItem(id, JSON.stringify(data));
    }

    /* Rendering methods */
    return (
      <S.Root>
        <Header linkGeneratedCallback={onGenerateLink} />
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
                        {row.map((cellValue, cellIndex) => (
                            <Cell
                                data={data}
                                rowIndex={rowIndex}
                                cellIndex={cellIndex}
                                cellValue={cellValue}
                                selectedCell={selectedCell}
                                selectedCellValue={selectedCellValue}
                                setSelectedCellValue={setSelectedCellValue}
                                onSelectCell={onSelectCell}
                                saveCellValue={saveCellValue}
                            />
                        ))}
                    </S.Row>
                ))}
            </S.TableBody>
        </S.Table>
      </S.Root>
    );
  }
  
  export default Spreadsheet;