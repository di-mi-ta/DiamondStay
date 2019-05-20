import React, {Component} from 'react';
import {Button, Modal, Input, Form, Menu, Select, InputNumber, Divider} from 'antd';

const Option = Select.Option;

const BasicForm = Form.create({ name:'desc'})(
    class extends React.Component {
      render() {
        const { visible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Form  layout="vertical">
              <Form.Item label="Loại chỗ ở">
                {getFieldDecorator('typeHome', {
                  rules: [{ required: true, message: 'Trường này không được bỏ trống !!!' }],
                })(
                    <Select>
                        <Option value="chungcu">Chung cư</Option>
                        <Option value="bietthu">Biệt thự</Option>
                        <Option value="canhostudio">Căn hộ Studio</Option>
                        <Option value="nharieng">Nhà riêng</Option>
                        <Option value="canhodichvu">Căn hộ dịch vụ</Option>
                        <Option value="khac">Khác</Option>
                    </Select>
                )}
              </Form.Item>
              <Form.Item label="Loại phòng">
                {getFieldDecorator('typeRoom', {
                  rules: [{ required: true, message: 'Trường này không được bỏ trống !!!' }],
                })(
                    <Select>
                        <Option value="nguyenca">Nguyên căn</Option>
                        <Option value="phongrieng">Phòng riêng</Option>
                    </Select>
                )}
              </Form.Item>
              <Form.Item label="Số khách tối đa">
                {getFieldDecorator('maxPeoples', {
                  rules: [{ required: true, message: 'Trường này không được bỏ trống !!!' }],
                })(
                    <InputNumber min='0' style={{width: '100%'}}/>
                )}
              </Form.Item>
              <Form.Item label="Diện tích chỗ ở (m2)">
                {getFieldDecorator('area', {
                  rules: [{ required: true, message: 'Trường này không được bỏ trống !!!' }],
                })(<Input />)}
              </Form.Item>
            </Form>
        );
      }
    },
);

const RoomBedForm = Form.create({name: 'desc'})(
    class extends React.Component {
      render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Form  layout="vertical">
                <Form.Item label="Loại phòng">
                    {getFieldDecorator('typeRoom', {
                    rules: [{ required: true, message: 'Vui lòng chọn loại phòng !!!' }],
                    })(
                        <Select>
                            <Option value="nguyencan">Nguyên căn</Option>
                            <Option value="phongrieng">Phòng riêng</Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label="Số khách tiêu chuẩn"> 
                    {getFieldDecorator('basicNumRenter', {
                    rules: [{ required: true, message: 'Vui lòng nhập trường này !!!' }],
                    })(<InputNumber min='0' style={{width: '100%'}}/>)}
                </Form.Item>
                <Form.Item label="Số khách tối đa">
                    {getFieldDecorator('maxNumRenter', {
                    rules: [{ required: true, message: 'Vui lòng nhập trường này !!!' }],
                    })(<InputNumber min='0' style={{width: '100%'}}/>)}
                </Form.Item>
            </Form>
        );
      }
    },
);


class RoomBed extends Component {
  constructor(props){
      super(props);
      this.onUpdateBtnClick = this.onUpdateBtnClick.bind(this);
  }

  onUpdateBtnClick = () => {
      const basicForm = this.basicFormRef.props.form;
      const roombedForm = this.roombedFormRef.props.form;
      basicForm.validateFields((err, basicValues) => {
        if (err) {
          return;
        }
        alert(JSON.stringify(basicValues));
        basicForm.resetFields();
      });
      roombedForm.validateFields((err, roomBedValues) => {
          if (err) {
              return;
          }
          alert(JSON.stringify(roomBedValues));
          roombedForm.resetFields();
      });
  }

  saveBasicFormRef = formRef => {
      this.basicFormRef = formRef;
  };
  saveRoomBedFormRef = formRef => {
      this.roombedFormRef = formRef;
  };

  render(){
      return(
          <div className="container">
              <h3>Thông tin cơ bản</h3>
              <Divider/>
              <BasicForm
                  wrappedComponentRef={this.saveBasicFormRef}
              /> 
              <h3>Phòng và giường</h3>
              <Divider/>
              <RoomBedForm
                  wrappedComponentRef={this.saveRoomBedFormRef}
              /> 
              <Button onClick={this.onUpdateBtnClick}> 
                  Cập nhật
              </Button>
          </div>
      );
  }
}

export default RoomBed;