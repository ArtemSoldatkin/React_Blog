import React, {memo, useState, useEffect} from 'react'
import './style.scss'

interface CmpProps {
    name?: string      
    initialState?: string 
    maxLength?: number
    loading?: boolean
    isValid?: boolean 
    onChange?: (value: string) => void
}

const checkLength = (val: string, maxLength: number) => val.length > maxLength ? val.substr(0, maxLength) : val 

export default memo((props: CmpProps) => {
    const [value, setValue] = useState<string>('')
    const [touched, setTouched] = useState<boolean>(false)
    const [isValid, setIsValid] = useState<boolean | undefined>(undefined)
    useEffect(() => {
        if(props.isValid !== undefined && isValid === undefined) setIsValid(props.isValid)
        if(props.onChange) props.onChange(value)
        if(value && props.initialState !== value)setTouched(true)
    },[props.isValid, touched, value])
    return (
        <div className="cmp_cst_textarea">
            {props.name && <p className="cmp_cst_textarea__label">{props.name}</p>}
            <textarea 
            className={`cmp_cst_textarea__input cmp_cst_textarea-${isValid !== undefined && (isValid ? 'inp_val' : 'inp_inval')}`}                
            placeholder={`${props.name ? props.name : ''}...`}
            disabled={props.loading}
            value={props.initialState && !touched ? props.initialState : value} 
            onChange={e => setValue(props.maxLength ? checkLength(e.target.value, props.maxLength) : e.target.value)}             
            onBlur={() => setIsValid(value.trim().length > 0)} />
            {props.maxLength && <p className={`cmp_cst_textarea__counter cmp_cst_textarea-${isValid !== undefined && 
                (isValid ? 'cnt_val' : 'cnt_inval')}
            `}>Символов: {value.length} из {props.maxLength}</p>}
            {isValid !== undefined && !isValid && props.name && <p className="cmp_cst_textarea__error">Заполните "{props.name}"!</p>}
        </div>
    )
})
