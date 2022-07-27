import styled from 'styled-components';

export const Root = styled.div``;

export const Header = styled.div`
    display: flex;
    height: 60px;
    align-items: center;
    padding-left: 40px;
`;

export const GenerateLinkButton = styled.button`
    height: 40px;
    background-color: steelblue;
    color: white;
    border: none;
    border-radius: 5px;
    padding-left: 20px;
    padding-right: 20px;
    box-shadow: 5px 5px 5px lightgrey;
    cursor: pointer;
`;

export const LinkLabel = styled.span`
    margin-right: 20px;
`

export const LinkText = styled.a`
    color: steelblue;
    margin-right: 20px;
`;

export const Table = styled.table``;

export const HeaderRow = styled.tr`
    position: sticky;
    top: 0;
    background-color: whitesmoke;
`;

export const HeaderColumnCell = styled.th``;

export const Row = styled.tr``;

export const HeaderRowCell = styled.td`
    background-color: whitesmoke;
    text-align: center;
`;

interface ICellProps {
    selected: boolean;
}
export const Cell = styled.td`
    border: ${(props: ICellProps) => props.selected ? '3px solid steelblue' : '1px solid lightsteelblue'};
    ${(props: ICellProps) => props.selected ? 'box-shadow: 5px 5px 5px lightgrey' : ''};
`;

export const CellContainer = styled.div``;

export const TooltipText = styled.span``;