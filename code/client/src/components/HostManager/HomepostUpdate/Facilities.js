import React, {Component} from 'react';
import {Button, Radio, Input, Form} from 'antd';
const RadioGroup = Radio.Group;

const FacilityForm = Form.create({ name: 'desc' })(
    class extends React.Component {
      render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Form  layout="vertical">
              <Form.Item label="Dành cho gia đình">
                {getFieldDecorator('forFamily', {
                  rules: [{ required: false}],
                })(
                  <RadioGroup name="radiogroup" defaultValue={1}>
                  <Radio value={0}>Phù hợp với trẻ nhỏ</Radio>
                  <Radio value={1}>Đệm bổ sung</Radio>
                  <Radio value={2}>Không hút thuốc</Radio>
                </RadioGroup>
                )}
              </Form.Item>
              <Form.Item label="Mô tả">
                {getFieldDecorator('description', {
                  rules: [{ required: false}],
                })(
                  <Input />
                )}
              </Form.Item>
            </Form>
        );
      }
    },
);

class Facilities extends Component {

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
      form.resetFields();
    });
  }

  render(){
      return(
          <div className="container">
              <FacilityForm
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

export default Facilities;