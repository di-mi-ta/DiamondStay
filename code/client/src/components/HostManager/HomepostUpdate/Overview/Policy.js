import React, {Component} from 'react';
import {Button, Modal, Input, Form, Menu, Select, InputNumber} from 'antd';

const PolicyForm = Form.create({ name: 'desc' })(
    class extends React.Component {
      render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Form  layout="vertical">
              <Form.Item label="Qui tắc chỗ ở">
                {getFieldDecorator('name', {
                  rules: [{ required: false }],
                })(
                  <Input />
                )}
              </Form.Item>
            </Form>
        );
      }
    },
);

class Policy extends Component {

  constructor(props){
    super(props);
    this.onUpdateBtnClick = this.onUpdateBtnClick.bind(this);
  }

  saveFormRef = formRef => {
      this.formRef = formRef;
  };

  onUpdateBtnClick = () => {
    const form = this.formRef.props.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
      alert(JSON.stringify(values))
      form.resetFields();
    });
  }

  render(){
      return(
          <div className="container">
              <PolicyForm
                  wrappedComponentRef={this.saveFormRef}
                  onCancel={this.handleCancel}
                  onCreate={this.handleCreate}
              /> 
              <Button onClick={this.onUpdateBtnClick}> 
                  Cập nhật
              </Button>
          </div>
      );
  }
}

export default Policy;