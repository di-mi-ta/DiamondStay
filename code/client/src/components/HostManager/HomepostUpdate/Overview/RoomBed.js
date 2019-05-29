import React, {Component} from 'react';
import {Button, Input, Form, Select, InputNumber, Divider, message, Card, Row, Col} from 'antd';
import {connect} from 'react-redux';
import * as actions from '../../../../redux/ActionCreators';

const Option = Select.Option;

const BasicForm = Form.create({ name:'desc'})(
    class extends React.Component {
      render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Form  layout="vertical">
              <Form.Item label={<b>Loại chỗ ở</b>}>
                {getFieldDecorator('typeHome', {
                  initialValue: this.props.homeposts.currentHomepost ? this.props.homeposts.currentHomepost.typeHome : '',
                  rules: [{ required: true, message: 'Trường này không được bỏ trống !!!' }],
                })(
                    <Select>
                        <Option value="Chung cư">Chung cư</Option>
                        <Option value="Biệt thự">Biệt thự</Option>
                        <Option value="Căn hộ Studio">Căn hộ Studio</Option>
                        <Option value="Nhà riêng">Nhà riêng</Option>
                        <Option value="Căn hộ dịch vụ">Căn hộ dịch vụ</Option>
                        <Option value="Khác">Khác</Option>
                    </Select>
                )}
              </Form.Item>
              <Form.Item label={<b>Loại phòng</b>}>
                {getFieldDecorator('typeRoom', {
                  initialValue: this.props.homeposts.currentHomepost ? this.props.homeposts.currentHomepost.typeRoom : '',
                  rules: [{ required: true, message: 'Trường này không được bỏ trống !!!' }],
                })(
                    <Select>
                        <Option value="Nguyên căn">Nguyên căn</Option>
                        <Option value="Phòng riêng">Phòng riêng</Option>
                    </Select>
                )}
              </Form.Item>
              <Form.Item label={<b>Số khách tối đa</b>}>
                {getFieldDecorator('maxPeoples', {
                  initialValue: this.props.homeposts.currentHomepost ? this.props.homeposts.currentHomepost.maxPeoples : '',
                  rules: [{ required: true, message: 'Trường này không được bỏ trống !!!' }],
                })(
                    <InputNumber min='0' style={{width: '100%'}}/>
                )}
              </Form.Item>
              <Form.Item label={<b>Diện tích chỗ ở (m2)</b>}>
                {getFieldDecorator('acreage', {
                  initialValue: this.props.homeposts.currentHomepost ? this.props.homeposts.currentHomepost.acreage : '',
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
               <Form.Item label={<b>Phòng ngủ</b>}>
                    {getFieldDecorator('numBed', {
                      initialValue: this.props.homeposts.currentHomepost ? this.props.homeposts.currentHomepost.numBed : '',
                      rules: [{ required: true, message: 'Vui lòng nhập trường này !!!' }],
                    })(<InputNumber min='0' style={{width: '100%'}}/>)}
                </Form.Item>
                <Form.Item label={<b>Giường</b>}>
                    {getFieldDecorator('numBedroom', {
                      initialValue: this.props.homeposts.currentHomepost ? this.props.homeposts.currentHomepost.numBedroom : '',
                      rules: [{ required: true, message: 'Vui lòng nhập trường này !!!' }],
                    })(<InputNumber min='0' style={{width: '100%'}}/>)}
                </Form.Item>
                <Form.Item label={<b>Phòng tắm</b>}>
                    {getFieldDecorator('numBathroom', {
                      initialValue: this.props.homeposts.currentHomepost ? this.props.homeposts.currentHomepost.numBathroom : '',
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
        roombedForm.validateFields((err, roomBedValues) => {
          if (err) {
              return;
          }
          const updatedHomepost = {
            ...this.props.homeposts.currentHomepost,
            numBed: roomBedValues.numBed,
            numBathroom: roomBedValues.numBathroom,
            numBedroom: roomBedValues.numBedroom,
            typeHome: basicValues.typeHome,
            maxPeoples: basicValues.maxPeoples,
            typeRoom: basicValues.typeRoom,
            acreage: basicValues.acreage
          }
          this.props.fetchUpdateHomepost(updatedHomepost);
          message.success('Cập nhật thành công');
          this.props.updateCurrentHomepost(updatedHomepost);
          roombedForm.resetFields();
        });
        basicForm.resetFields();
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
              <Row>
                <Col span={6}> 
                  <h3><b>Phòng và giường</b></h3>
                </Col>
                <Col span={6} offset={12}>
                  <Button onClick={this.onUpdateBtnClick} style={{marginBottom: 10, boxShadow: '0 8px 12px rgba(0,0,0,.1)'}}> 
                    Cập nhật
                  </Button>
                </Col>
              </Row>
              <Card style={{
                        width: '100%', padding: 10, 
                        marginTop: 10, marginBottom: 10,
                        boxShadow: '0 8px 12px rgba(0,0,0,.1)',}}>
                <h4><b>Thông tin cơ bản</b></h4>
                <Divider/>
                <BasicForm
                    wrappedComponentRef={this.saveBasicFormRef}
                    homeposts={this.props.homeposts}
                />
              </Card>
              <Card style={{
                        width: '100%', padding: 10, 
                        marginTop: 10, marginBottom: 10,
                        boxShadow: '0 8px 12px rgba(0,0,0,.1)',}}>
                <h4><b>Phòng và giường</b></h4>
                <Divider/>
                <RoomBedForm
                    wrappedComponentRef={this.saveRoomBedFormRef}
                    homeposts={this.props.homeposts}
                />
              </Card> 
          </div>
      );
  }
}

const mapStateToProps = state => ({
  homeposts: state.homeposts,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUpdateHomepost: (homepost) => {dispatch(actions.fetchUpdateHomepost(homepost))},
  updateCurrentHomepost: (homepost) => {dispatch(actions.updateCurrentHomepost(homepost))},
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomBed);
