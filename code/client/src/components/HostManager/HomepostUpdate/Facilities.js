import React, {Component} from 'react';
import {Button, message, Form, Checkbox, Divider, Row, Col} from 'antd';
import {connect} from 'react-redux';
import * as actions from '../../../redux/ActionCreators';
import { Card } from 'semantic-ui-react';

const CheckboxGroup = Checkbox.Group;

const FacilityForm = Form.create({ name: 'facilities' })(
    class extends React.Component {
      render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Form  layout="vertical">
              <Form.Item label={<h4><b>Dành cho gia đình</b></h4>}>
                {getFieldDecorator('forFamily', {
                  initialValue: this.props.homeposts.currentHomepost ?
                                this.props.homeposts.currentHomepost.forFamily : '',
                  rules: [{ required: false}],
                })(
                  <CheckboxGroup
                    options={['Phù hợp với trẻ nhỏ', 'Đệm bổ sung', 'Không hút thuốc']}
                  />
                )}
              </Form.Item>
              <Divider/>
              <Form.Item label={<h4><b>Nhà bếp</b></h4>}>
                {getFieldDecorator('kitchenFacs', {
                  initialValue: this.props.homeposts.currentHomepost ?
                                this.props.homeposts.currentHomepost.kitchenFacs : '',
                  rules: [{ required: false}],
                })(
                  <CheckboxGroup>
                    <Col span={8}>
                      <Checkbox value="Bếp điện">Bếp điện</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="Lò vi sóng">Lò vi sóng</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="Tủ lạnh">Tủ lạnh</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="Bếp ga">Bếp ga</Checkbox>
                    </Col>
                  </CheckboxGroup>
                )}
              </Form.Item>
              <Divider/>
              <Form.Item label={<h4><b>Hoạt động giải trí</b></h4>}>
                {getFieldDecorator('funnyActs', {
                  initialValue: this.props.homeposts.currentHomepost ? 
                                this.props.homeposts.currentHomepost.funnyActs : '',
                  rules: [{ required: false}],
                })(
                  <CheckboxGroup
                  >
                    <Col span={6}>
                      <Checkbox value="Cho thú cưng">Cho thú cưng</Checkbox>
                    </Col>
                    <Col span={6}>
                      <Checkbox value="BBQ">BBQ</Checkbox>
                    </Col>
                    <Col span={6}>
                      <Checkbox value="Cảnh quan đẹp">Cảnh quan đẹp</Checkbox>
                    </Col>
                    <Col span={6}>
                      <Checkbox value="Hướng biển">Hướng biển</Checkbox>
                    </Col>
                    <Col span={6}>
                      <Checkbox value="Gần sân golf">Gần sân golf</Checkbox>
                    </Col>
                    <Col span={6}>
                      <Checkbox value="Câu cá">Câu cá</Checkbox>
                    </Col>
                    <Col span={6}>
                      <Checkbox value="Bể bơi">Bể bơi</Checkbox>
                    </Col>
                    <Col span={6}>
                      <Checkbox value="Bar">Bar</Checkbox>
                    </Col>
                  </CheckboxGroup>
                )}
              </Form.Item>
              <Divider/>
              <Form.Item label={<h4><b>Tiện ích phòng</b></h4>}>
                {getFieldDecorator('roomFacs', {
                  initialValue: this.props.homeposts.currentHomepost ? 
                                this.props.homeposts.currentHomepost.roomFacs : '',
                  rules: [{ required: false}],
                })(
                  <CheckboxGroup
                    options={['Ban công']}
                  />
                )}
              </Form.Item>
              <Divider/>
              <Form.Item label={<h4><b>Tiện ích</b></h4>}>
                {getFieldDecorator('convenience', {
                  initialValue: this.props.homeposts.currentHomepost ? 
                                this.props.homeposts.currentHomepost.convenience : '',
                  rules: [{ required: false}],
                })(
                  <CheckboxGroup>
                    <Row>
                      <Col span={4}>
                        <Checkbox value="Wifi">Wifi</Checkbox>
                      </Col>
                      <Col span={4}>
                        <Checkbox value="Tivi">Tivi</Checkbox>
                      </Col>
                      <Col span={4}>
                        <Checkbox value="Điều hòa">Điều hòa</Checkbox>
                      </Col>
                      <Col span={4}>
                        <Checkbox value="Máy giặt">Máy giặt</Checkbox>
                      </Col>
                      <Col span={4}>
                        <Checkbox value="Dầu gội, dầu xã">Dầu gội, dầu xã</Checkbox>
                      </Col>
                      <Col span={4}>
                        <Checkbox value="Giấy vệ sinh">Giấy vệ sinh</Checkbox>
                      </Col>
                      <Col span={4}>
                        <Checkbox value="Giấy ăn">Giấy ăn</Checkbox>
                      </Col>
                      <Col span={4}>
                        <Checkbox value="Nước khoáng">Nước khoáng</Checkbox>
                      </Col>
                      <Col span={4}>
                        <Checkbox value="Khăn tắm">Khăn tắm</Checkbox>
                      </Col>
                      <Col span={4}>
                        <Checkbox value="Kem đánh răng">Kem đánh răng</Checkbox>
                      </Col>
                      <Col span={4}>
                        <Checkbox value="Xà phòng tắm">Xà phòng tắm</Checkbox>
                      </Col>
                      <Col span={4}>
                        <Checkbox value="Thang máy">Thang máy</Checkbox>
                      </Col>
                      <Col span={4}>
                        <Checkbox value="Máy sấy">Máy sấy</Checkbox>
                      </Col>
                    </Row>
                  </CheckboxGroup>
                )}
              </Form.Item>
              <Divider/>
              <Form.Item label={<h4><b>Tiện ích nổi bật</b></h4>}>
                {getFieldDecorator('highlightFacs', {
                  initialValue: this.props.homeposts.currentHomepost ? 
                                this.props.homeposts.currentHomepost.highlightFacs : '',
                  rules: [{ required: false}],
                })(
                  <CheckboxGroup>
                    <Col span={8}>
                        <Checkbox value="Máy chiếu phim">Máy chiếu phim</Checkbox>
                    </Col>
                    <Col span={8}>
                        <Checkbox value="Ghế massage">Ghế massage</Checkbox>
                    </Col>
                    <Col span={8}>
                        <Checkbox value="Smart tivi">Smart tivi</Checkbox>
                    </Col>
                    <Col span={8}>
                        <Checkbox value="Tủ đựng rượu">Tủ đựng rượu</Checkbox>
                    </Col>
                    <Col span={8}>
                        <Checkbox value="Phòng tập gym">Phòng tập gym</Checkbox>
                    </Col>
                  </CheckboxGroup>
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
        const updatedHomepost = {
          ...this.props.homeposts.currentHomepost,
          forFamily: values.forFamily,
          kitchenFacs: values.kitchenFacs,
          funnyActs: values.funnyActs,
          roomFacs: values.roomFacs,
          convenience: values.convenience,
          highlightFacs: values.highlightFacs,
          
        }
        this.props.fetchUpdateHomepost(updatedHomepost);
        message.success('Cập nhật thành công');
        this.props.updateCurrentHomepost(updatedHomepost);
      form.resetFields();
    });
  }

  render(){
      return(
          <div className="container">
              <Row>
                <Col span={6}> 
                  <h3><b>Tiện ích</b></h3> 
                </Col>
                <Col span={6} offset={12}>
                <Button onClick={this.onUpdateBtnClick} style={{marginBottom: 10, boxShadow: '0 8px 12px rgba(0,0,0,.1)'}}> 
                    Cập nhật
                  </Button>
                </Col>
              </Row>
              <Card style={{
                        width: '100%', padding: 30, 
                        marginTop: 10, marginBottom: 10,
                        boxShadow: '0 8px 12px rgba(0,0,0,.1)',}}>
              <FacilityForm
                  wrappedComponentRef={this.saveFormRef}
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
  updateCurrentHomepost: (homepost) => {dispatch(actions.updateCurrentHomepost(homepost))},
  fetchUpdateHomepost: (homepost) => {dispatch(actions.fetchUpdateHomepost(homepost))}
});

export default connect(mapStateToProps, mapDispatchToProps)(Facilities);
