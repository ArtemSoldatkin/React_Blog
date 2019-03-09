import React, { PureComponent } from "react";
import { Form } from "react-bootstrap";
import { isString } from "../../types";

interface CmpProps {
  type: "text" | "password";
  placeholder?: string;
  loading?: boolean;
  onChange?: (value: string | undefined) => void;
  validated?: boolean;
  customRules?: () => boolean
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
    if (
      this.props.validated !== undefined &&
      this.props.validated !== prevProps.validated
    )
      this.setState({ validated: this.props.validated });
  }
  private handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    this.props.onChange && this.props.onChange(value);
    this.setState({ value });
  };
  private handleBlur = (): void => {
    const { value } = this.state;
    let validated: boolean | undefined = isString(value)    
    if(validated && this.props.customRules) validated = this.props.customRules()    
    this.setState({ validated });
  };
  render() {
    const { type, placeholder, loading } = this.props;
    const { validated } = this.state;
    return (
      <Form.Control
        disabled={loading}
        onChange={(e: any) => this.handleChange(e)}
        onBlur={this.handleBlur}
        isValid={validated}
        isInvalid={validated !== undefined && !validated}
        type={type}
        placeholder={placeholder}
      />
    );
  }
}
