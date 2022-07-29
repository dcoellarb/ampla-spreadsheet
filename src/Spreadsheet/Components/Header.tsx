import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import * as S from './../style';
import { IHeaderProps } from './../types';
import { useParams } from "react-router-dom";

function Header({ linkGeneratedCallback }: IHeaderProps) {
    const [linkId, setLinkId] = useState<string>()
    const [linkCopied, setLinkCopied] = useState<boolean>(false)
        
    let { spreadsheetId } = useParams();
    
    // Load from spreadsheetId on url
    useEffect(() => {
        if (spreadsheetId) {
            setLinkId(spreadsheetId)
        }
    }, [spreadsheetId])

    /* Handler methods */

    const onGenerateLink = () => {
        const id = uuidv4();
        setLinkId(id);
        linkGeneratedCallback(id);
    }

    /* Rendering methods */

    const url = linkId ? `http://localhost:3000/spreadsheets/${linkId}` : undefined
    return (
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
    );
  }
  
  export default Header;