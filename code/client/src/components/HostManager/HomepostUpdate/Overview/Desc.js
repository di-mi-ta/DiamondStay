import React, {Component} from 'react';
import {Button, Modal, Input, Form, Menu, Select, InputNumber} from 'antd';

const DescForm = Form.create({ name: 'desc' })(
    class extends React.Component {
      render() {
        const { form } = this.props;
        const { getFieldDecorator, setFieldsValue } = form;
        return (
            <Form  layout="vertical">
              <Form.Item label="Tiêu đề">
                {getFieldDecorator('name', 
                  { initialValue: this.props.homeposts.currentHomepost.name,
                    rules: [{ required: true, message: 'Vui lòng nhập tên chỗ ở !!!', 
                    }],
                })(
                  <Input/>
                )}
              </Form.Item>
              <Form.Item label="Mô tả">
                {getFieldDecorator('description', 
                  { initialValue: this.props.homeposts.currentHomepost.description,
                    rules: [{required: false}],
                })(
                  <Input/>
                )}
              </Form.Item>
            </Form>
        );
      }
    },
);

class Desc extends Component {
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
        const updatedHomepost = {
          ...this.props.homeposts.currentHomepost,
          name: values.name,
          description: values.description
        }
        this.props.fetchUpdateHomepost(updatedHomepost);
        this.props.updateCurrentHomepost(updatedHomepost);
      form.resetFields();
    });
  }

  render(){
      return(
          <div className="container">
              <DescForm
                  wrappedComponentRef={this.saveFormRef}
                  onCancel={this.handleCancel}
                  onCreate={this.handleCreate}
                  homeposts={this.props.homeposts}
              /> 
              <Button onClick={this.onUpdateBtnClick}> 
                  Cập nhật
              </Button>
          </div>
      );
  }
}

export default Desc;