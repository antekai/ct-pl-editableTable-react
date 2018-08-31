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
  dateFormat = "DD.MM.YYYY";
  getInput = (record, dataIndex, title, getFieldDecorator) => {
    switch (this.props.inputType) {
      case "number":
        return (
          <FormItem style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`
                }
              ],
              initialValue: record[dataIndex]
            })(<InputNumber />)}
          </FormItem>

          // <InputNumber />
        );
      case "date":
        return (
          <DatePicker
            format={this.dateFormat}
            defaultValue={moment(record[dataIndex], dateFormat)}
          />
        );
      case "checkbox":
        return <Checkbox>Checkbox</Checkbox>;
      case "radio":
        return (
          <FormItem style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              initialValue: record[dataIndex]
            })(
              <RadioGroup>
                <Radio value={"a"}>a</Radio>
                <Radio value={"b"}>b</Radio>
              </RadioGroup>
            )}
          </FormItem>
        );
      case "select":
        return (
          <FormItem style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              initialValue: record[dataIndex]
            })(
              <Select defaultValue="1" style={{ width: 150 }}>
                {[1, 2, 3, 4, 5].map(c => `Product ${c}`).map(p => (
                  <Option value={p}>{p}</Option>
                ))}
              </Select>
            )}
          </FormItem>
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
              {editing
                ? // <FormItem style={{ margin: 0 }}>
                  //   {getFieldDecorator(dataIndex, {
                  //     rules: [
                  //       {
                  //         required: true,
                  //         message: `Please Input ${title}!`
                  //       }
                  //     ]
                  //     // initialValue: record[dataIndex]
                  //   })(this.getInput())}
                  // </FormItem>
                  this.getInput(record, dataIndex, title, getFieldDecorator)
                : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}
