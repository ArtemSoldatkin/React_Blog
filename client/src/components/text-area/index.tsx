import React, {PureComponent} from 'react'
import './style.scss'

interface CmpProps {
    name: string      
    maxLength?: number
    loading?: boolean
    isValid?: boolean 
    onChange?: (value: string) => void
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
    private handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const {maxLength, onChange} = this.props
        let value = e.target.value
        if(value && maxLength && value.length > maxLength) value = value.substr(0, maxLength) 
        this.setState({value}, () => onChange && onChange(value))
    }
    private handleBlur = () => this.setState(({value}) => ({isValid: value.trim().length > 0}))       
    render () {
        const {value, isValid} = this.state
        const {maxLength, name, loading} = this.props
        return (
            <div id="custom_textarea">
                <p className="label">{name}</p>
                <textarea className={`textarea textarea-${isValid !== undefined && 
                    (isValid ? 'isValid' : 'isInvalid')}
                `}                
                placeholder={`${name}...`}
                disabled={loading}
                value={value} onChange={this.handleChange} onBlur={this.handleBlur} />
                {maxLength && <p className={`counter counter-${isValid !== undefined && 
                    (isValid ? 'isValid' : 'isInvalid')}
                `}>Символов: {value.length} из {maxLength}</p>}
                {isValid !== undefined && !isValid && <p className="error">Заполните "{name}"!</p>}
            </div>
        )
    }
}
