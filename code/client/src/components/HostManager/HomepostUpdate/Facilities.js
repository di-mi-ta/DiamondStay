import React, {Component} from 'react';
import {Button, Input, Form, Checkbox, Divider} from 'antd';
import {connect} from 'react-redux';
import * as actions from '../../../redux/ActionCreators';

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
                  initialValue: this.props.homeposts.currentHomepost.forFamily,
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
                  initialValue: this.props.homeposts.currentHomepost.kitchenFacs,
                  rules: [{ required: false}],
                })(
                  <CheckboxGroup
                    options={['Bếp điện', 'Lò vi sóng', 'Tủ lạnh', 'Bếp ga']}
                  />
                )}
              </Form.Item>
              <Divider/>
              <Form.Item label={<h4><b>Hoạt động giải trí</b></h4>}>
                {getFieldDecorator('funnyActs', {
                  initialValue: this.props.homeposts.currentHomepost.funnyActs,
                  rules: [{ required: false}],
                })(
                  <CheckboxGroup
                    options={['Cho thú cưng', 'BBQ', 'Cảnh quan đẹp', 'Hướng biển', 'Gần sân golf', 'Câu cá', 'Bể bơi']}
                  />
                )}
              </Form.Item>
              <Divider/>
              <Form.Item label={<h4><b>Tiện ích phòng</b></h4>}>
                {getFieldDecorator('roomFacs', {
                  initialValue: this.props.homeposts.currentHomepost.roomFacs,
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
                  initialValue: this.props.homeposts.currentHomepost.convenience,
                  rules: [{ required: false}],
                })(
                  <CheckboxGroup
                    options={['Wifi', 'Tivi', 'Điều hòa', 'Máy giặt', 'Dầu gội, dầu xã', 'Giấy vệ sinh',
                    'Giấy ăn', 'Nước khoáng', 'Khăn tắm', 'Kem đánh răng', 'Xà phòng tắm',
                    'Thang máy','Máy sấy']}
                  />
                )}
              </Form.Item>
              <Divider/>
              <Form.Item label={<h4><b>Tiện ích nổi bật</b></h4>}>
                {getFieldDecorator('highlightFacs', {
                  initialValue: this.props.homeposts.currentHomepost.highlightFacs,
                  rules: [{ required: false}],
                })(
                  <CheckboxGroup
                    options={['Máy chiếu phim', 'Ghế massage', 'Smart tivi', 'Tủ đựng rượu']}
                  />
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
        this.props.updateCurrentHomepost(updatedHomepost);
      form.resetFields();
    });
  }

  render(){
      return(
          <div className="container">
              <Button onClick={this.onUpdateBtnClick} type='primary'> 
                  Cập nhật
              </Button>
              <FacilityForm
                  wrappedComponentRef={this.saveFormRef}
                  homeposts={this.props.homeposts}
              /> 
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
