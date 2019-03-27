import React, {memo, useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import { Popover,Overlay } from "react-bootstrap";

interface CmpProps {
    icon: IconDefinition
    text: string  
    fnc: () => void
}
  
export default memo(({icon, text, fnc}: CmpProps) => {
    const [show, setShow] = useState<boolean>(false)
    const [target, setTarget] = useState<any>(undefined)
    const handleOk = () => (fnc(), handleCancel())
    const handleCancel = () => (setShow(false) , setTarget(undefined))
    return (
        <>
            <span className="button" onClick={({target}) => (setShow(true), setTarget(target))}>
                <FontAwesomeIcon icon={icon} className="icon" />
                <p className="text">{text}</p>
            </span>
            <Overlay 
                show={show}       
                target={target} 
                placement={"top"}
                rootCloseEvent="mousedown"
                rootClose={true}
                onHide={handleCancel}     
                >
                <Popover
                    id={`${text}-confirm`}
                    placement="top"
                    title="Уверены?"
                    className="main_actions__popover_confirm"
                    >
                    <span className="button button-ok" onClick={handleOk}>Да</span>
                    <span className="button button-cancel" onClick={handleCancel}>Нет</span>
                </Popover>  
            </Overlay>
        </>
    )
})
