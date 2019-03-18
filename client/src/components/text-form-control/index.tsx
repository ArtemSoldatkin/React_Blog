import React, { PureComponent } from "react";
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
interface CmpStates {
  value: string | undefined;
  validated: boolean | undefined;
}

export default class CustomFormControl extends PureComponent<
  CmpProps,
  CmpStates
> {
  constructor(props: CmpProps) {
    super(props);
    this.state = { value: undefined, validated: undefined };
  }
  componentDidUpdate(prevProps: CmpProps) {
    if ( this.props.validated !== undefined && 
      this.props.validated !== prevProps.validated &&
      this.state.validated === undefined 
      ) this.setState({ validated: this.props.validated });
    if(this.props.customRule !== undefined && this.props.customRule !== this.state.validated) this.setState({validated: this.props.customRule})
  }
  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const {onChange} = this.props    
    this.setState({ value }, () => onChange && onChange(value));
  };
  private handleBlur = () => this.setState(({value}) => ({ validated: isString(value) })); 
  render() {
    const { type, placeholder, loading, label, feedback, children } = this.props;
    const { validated } = this.state;
    return (
      <div id="custom_text_form_control">
        {label && <p className="form_label">{label}</p>}
        <div className={`form_input form_input-${validated !== undefined && (
            validated ? 'valid' : 'invalid'
          )}`} >
          <input className='text_field'              
          disabled={loading}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          type={type}
          placeholder={placeholder}
          />
          {children}
        </div>
        {feedback && validated !== undefined && !validated && <p className="form_feedback">{feedback}</p>}
      </div>
    );
  }
}
