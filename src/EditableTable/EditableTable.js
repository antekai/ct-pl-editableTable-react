import React from "react";
import { Table, Popconfirm } from "antd";
import { EditableFormRow, EditableContext } from "./EditableFormRow";
import EditableCell from "./EditableCell";
import { plCleanData } from "../data/plCleanData";
import { antData } from "../data/antData";
import { antColumns } from "./antColumns";

console.log(antData);
//test data preprocess
console.log(plCleanData);

export default class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: antData, editingKey: "" };
    this.columns = [
      ...antColumns,
      {
        title: "operation",
        dataIndex: "operation",
        render: (text, record) => {
          const editable = this.isEditing(record);
          return (
            <div>
              {editable ? (
                <span>
                  <EditableContext.Consumer>
                    {form => (
                      <a
                        href="javascript:;"
                        onClick={() => this.save(form, record.key)}
                        style={{ marginRight: 8 }}
                      >
                        Save
                      </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                    title="Sure to cancel?"
                    onConfirm={() => this.cancel(record.key)}
                  >
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
              ) : (
                <a onClick={() => this.edit(record.key)}>Edit</a>
              )}
            </div>
          );
        }
      }
    ];
    // this.columns = [
    //   {
    //     title: "name",
    //     dataIndex: "name",
    //     width: "25%",
    //     editable: true
    //   },
    //   {
    //     title: "age",
    //     dataIndex: "age",
    //     width: "15%",
    //     editable: true
    //   },
    //   {
    //     title: "address",
    //     dataIndex: "address",
    //     width: "40%",
    //     editable: true
    //   },
    //   {
    //     title: "camp_cpc",
    //     dataIndex: "camp_cpc",
    //     width: "10%",
    //     editable: true
    //   },
    //   {
    //     title: "operation",
    //     dataIndex: "operation",
    //     render: (text, record) => {
    //       const editable = this.isEditing(record);
    //       return (
    //         <div>
    //           {editable ? (
    //             <span>
    //               <EditableContext.Consumer>
    //                 {form => (
    //                   <a
    //                     href="javascript:;"
    //                     onClick={() => this.save(form, record.key)}
    //                     style={{ marginRight: 8 }}
    //                   >
    //                     Save
    //                   </a>
    //                 )}
    //               </EditableContext.Consumer>
    //               <Popconfirm
    //                 title="Sure to cancel?"
    //                 onConfirm={() => this.cancel(record.key)}
    //               >
    //                 <a>Cancel</a>
    //               </Popconfirm>
    //             </span>
    //           ) : (
    //             <a onClick={() => this.edit(record.key)}>Edit</a>
    //           )}
    //         </div>
    //       );
    //     }
    //   }
    // ];
  }

  isEditing = record => {
    return record.key === this.state.editingKey;
  };

  edit(key) {
    this.setState({ editingKey: key });
  }

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row
        });
        this.setState({ data: newData, editingKey: "" });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: "" });
      }
    });
  }

  cancel = () => {
    this.setState({ editingKey: "" });
  };

  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === "age" ? "number" : "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record)
        })
      };
    });

    return (
      <Table
        components={components}
        bordered
        dataSource={this.state.data}
        columns={columns}
        rowClassName="editable-row"
      />
    );
  }
}
