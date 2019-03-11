import React, {PureComponent} from 'react'
import './style.scss'

interface CmpProps {
    name: string
    onChange?: (value: string) => void  
    maxLength?: number
    loading?: boolean
    isValid?: boolean 
}
interface CmpStates {
    value: string
    isValid: boolean | undefined
}

export default class CustomTextArea extends PureComponent<CmpProps, CmpStates> {
    constructor(props: CmpProps){
        super(props)
        this.state = { value: '', isValid: undefined }
    }
    componentDidUpdate (prevProps: CmpProps) {
        if(prevProps.isValid !== this.props.isValid && 
            this.props.isValid !== undefined && this.state.isValid === undefined)this.setState({isValid: this.props.isValid})
    }
    private handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        const {maxLength} = this.props
        let value: string = e.target.value
        if(maxLength && value.length > maxLength) value = value.substr(0, maxLength) 
        this.setState({value})
        this.props.onChange && this.props.onChange(value)
    }
    private handleBlur = (): void => {
        const {value} = this.state      
        const isValid = value.trim().length > 0
        this.setState({isValid}) 
    }
    render () {
        const {value, isValid} = this.state
        const {maxLength, name, loading} = this.props
        return (
            <div className="custom-textarea">
                <p className="label">{name}</p>
                <textarea className={`textarea 
                    ${isValid !== undefined && isValid && 'textarea-isValid' }
                    ${isValid !== undefined && !isValid && 'textarea-isInvalid' }
                `}
                placeholder={`${name}...`}
                disabled={loading}
                value={value} onChange={this.handleChange} onBlur={this.handleBlur} />
                {maxLength && <p className={`counter 
                    ${isValid !== undefined && isValid && 'counter-isValid' }
                    ${isValid !== undefined && !isValid && 'counter-isInvalid' }
                `}>Символов: {value.length} из {maxLength}</p>}
                {isValid !== undefined && !isValid && <p className="error">Заполните "{name}"!</p>}
            </div>
        )
    }
}