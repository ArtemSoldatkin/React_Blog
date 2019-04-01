import React, {memo, useState, useEffect} from 'react'
import { isStr, optStr, optBool, InputType } from "../../types";
import './style.scss'

interface CmpProps {
  type: InputType;
  placeholder?: string;
  loading?: boolean;  
  validated?: boolean;
  customRule?: boolean
  label?: string 
  feedback?: string
  children?: JSX.Element
  onChange?: (value: optStr) => void;
}

export default memo((props: CmpProps) => {
  const [value, setValue] = useState<optStr>(undefined)
  const [validated, setValidated] = useState<optBool>(undefined)
  useEffect(() => {
    if(props.customRule !== undefined && props.customRule !== validated){
      props.validated !== undefined && validated === undefined ? setValidated(props.validated) : setValidated(props.customRule)
    }    
  },[props.validated, props.customRule])
  return (
    <div className="tx_form_ctrl">
      {props.label && <p className="tx_form_ctrl__lbl">{props.label}</p>}
      <div className={`tx_form_ctrl__tx_block 
      tx_form_ctrl-${validated !== undefined && (validated ? 'val' : 'inval')}`} >
        <input className='tx_form_ctrl__input'              
        disabled={props.loading}
        onChange={e => {
          setValue(e.target.value)
          props.onChange && props.onChange(e.target.value)
        }}
        onBlur={() => setValidated(isStr(value))}
        type={props.type}
        placeholder={props.placeholder}
        />
        {props.children}
      </div>
      {props.feedback && validated === false && <p className="tx_form_ctrl__feedback">{props.feedback}</p>}
    </div>
  )
})
