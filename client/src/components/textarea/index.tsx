import React, { memo, useState, useEffect } from 'react';
import { optBool } from '../../types';
import './style.scss';

interface CmpProps {
    name?: string;
    initialState?: string;
    maxLength?: number;
    loading?: boolean;
    isValid?: boolean;
    onChange?: (value: string) => void;
}

export default memo((props: CmpProps) => {
    const [value, setValue] = useState<string>('');
    const [touched, setTouched] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<optBool>(undefined);
    const checkLength = (val: string, maxLength: number) =>
        val.length > maxLength ? val.substr(0, maxLength) : val;
    useEffect(() => {
        if (props.isValid !== undefined && isValid === undefined) setIsValid(props.isValid);
        if (props.onChange) props.onChange(value);
        if (value && props.initialState !== value) setTouched(true);
    }, [props.isValid, touched, value, isValid]);
    return (
        <div className="cmp_itx">
            {props.name && <p className="cmp_itx__label">{props.name}</p>}
            <textarea
                className={`cmp_itx__input cmp_itx-${isValid !== undefined &&
                    (isValid ? 'inp_val' : 'inp_inval')}`}
                placeholder={`${props.name ? props.name : ''}...`}
                disabled={props.loading}
                value={props.initialState && !touched ? props.initialState : value}
                onChange={e =>
                    setValue(
                        props.maxLength
                            ? checkLength(e.target.value, props.maxLength)
                            : e.target.value
                    )
                }
                onBlur={() => setIsValid(touched ? value.trim().length > 0 : undefined)}
            />
            {props.maxLength && (
                <p
                    className={`cmp_itx__counter cmp_itx-${isValid !== undefined &&
                        (isValid ? 'cnt_val' : 'cnt_inval')}
            `}>
                    Символов:{' '}
                    {props.initialState && !touched ? props.initialState.length : value.length} из{' '}
                    {props.maxLength}
                </p>
            )}
            {isValid !== undefined && !isValid && props.name && (
                <p className="cmp_itx__err">Заполните "{props.name}"!</p>
            )}
        </div>
    );
});
