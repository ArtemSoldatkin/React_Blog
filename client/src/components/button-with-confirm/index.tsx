import React, {memo, useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import { Popover,Overlay } from "react-bootstrap";
import './style.scss'

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
            <span className="btn_w_conf" onClick={({target}) => (setShow(true), setTarget(target))}>
                <FontAwesomeIcon icon={icon} className="btn_w_conf__icon" />
                <p className="btn_w_conf__tx">{text}</p>
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
                    className="pop_conf"
                    >
                    <span className="pop_conf__btn pop_conf__btn_ok" onClick={handleOk}>Да</span>
                    <span className="pop_conf__btn pop_conf__btn_cancel" onClick={handleCancel}>Нет</span>
                </Popover>  
            </Overlay>
        </>
    )
})
