import React, {memo, useState, useEffect} from 'react'
import { isString } from "../../types";
import './style.scss'

interface CmpProps {
  type: "text" | "password";
  placeholder?: string;
  loading?: boolean;  
  validated?: boolean;
  customRule?: boolean
  label?: string 
  feedback?: string
  children?: JSX.Element
  onChange?: (value: string | undefined) => void;
}

export default memo((props: CmpProps) => {
  const [value, setValue] = useState<string | undefined>(undefined)
  const [validated, setValidated] = useState<boolean | undefined>(undefined)
  useEffect(() => {
    if(props.customRule !== undefined && props.customRule !== validated){
      props.validated !== undefined && validated === undefined ? setValidated(props.validated) : setValidated(props.customRule)
    }    
  },[props.validated, props.customRule])
  return (
    <div className="cmp_txt_form_ctrl">
      {props.label && <p className="cmp_txt_form_ctrl__label">{props.label}</p>}
      <div className={`cmp_txt_form_ctrl__text_block 
      cmp_txt_form_ctrl-${validated !== undefined && (validated ? 'val' : 'inval')}`} >
        <input className='cmp_txt_form_ctrl__input'              
        disabled={props.loading}
        onChange={e => {
          setValue(e.target.value)
          props.onChange && props.onChange(e.target.value)
        }}
        onBlur={() => setValidated(isString(value))}
        type={props.type}
        placeholder={props.placeholder}
        />
        {props.children}
      </div>
      {props.feedback && validated === false && <p className="cmp_txt_form_ctrl__feedback">{props.feedback}</p>}
    </div>
  )
})
