import React from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Checkbox,
  Radio
} from "antd";
import { EditableContext } from "./EditableFormRow";
import moment from "moment";
const FormItem = Form.Item;
const dateFormat = "DD/MM/YYYY";
const Option = Select.Option;
const RadioGroup = Radio.Group;
export default class EditableCell extends React.Component {
  // getInput = () => {
  //   if (this.props.inputType === "number") {
  //     return <InputNumber />;
  //   }
  //   return <Input />;
  // };
  dateFormat = "DD/MM/YYYY";
  getInput = () => {
    switch (this.props.inputType) {
      case "number":
        return <InputNumber />;
      // case "date":
      //   return <DatePicker defaultValue={moment(record, this.dateformat)} />;
      case "checkbox":
        return <Checkbox>Checkbox</Checkbox>;
      case "radio":
        return (
          <RadioGroup>
            <Radio value={"a"}>a</Radio>
            <Radio value={"b"}>b</Radio>
          </RadioGroup>
        );
      case "select":
        return (
          <Select defaultValue="1" style={{ width: 150 }}>
            {[1, 2, 3, 4, 5].map(x => `Product ${x}`).map(x => (
              <Option value={x}>{x}</Option>
            ))}
          </Select>
        );

      default:
        return <Input />;
    }
  };

  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {form => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [
                      {
                        required: true,
                        message: `Please Input ${title}!`
                      }
                    ]
                    // initialValue: record[dataIndex]
                  })(this.getInput())}
                </FormItem>
              ) : (
                restProps.children
              )}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}
