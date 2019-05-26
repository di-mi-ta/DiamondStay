import React, {Component} from 'react';
import {Button, Input, Form, Select, InputNumber, Divider, message} from 'antd';
import {connect} from 'react-redux';
import * as actions from '../../../redux/ActionCreators';

const Option = Select.Option;

const PriceForm = Form.create({ name:'desc'})(
    class extends React.Component {
      render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <div>
            <h4><b>Giá</b></h4>
            <Form  layout="vertical">
              <Form.Item label="Giá cơ bản">
                {getFieldDecorator('weekdayPrice', {
                  initialValue: this.props.homeposts.currentHomepost.weekdayPrice,
                  rules: [{ required: true, message: 'Trường này không được bỏ trống !!!' }],
                })(
                    <InputNumber min='0' style={{width: '100%'}}/>

                )}
              </Form.Item>
              <Form.Item label="Giá cuối tuần">
                {getFieldDecorator('weekendPrice', {
                  initialValue: this.props.homeposts.currentHomepost.weekendPrice,
                  rules: [{ required: true, message: 'Trường này không được bỏ trống !!!' }],
                })(<Input />)}
              </Form.Item>
            </Form>
            </div>
        );
      }
    },
);

const CurrencyUnitForm = Form.create({name: 'desc'})(
    class extends React.Component {
      render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <div>
            <h4><b>Đơn vị tiền tệ</b></h4>
            <Form  layout="vertical">
               <Form.Item label="Đơn vị tiền tệ:">
                {getFieldDecorator('currencyUnit', {
                  initialValue: this.props.homeposts.currentHomepost.currencyUnit,
                  rules: [{ required: true, message: 'Trường này không được bỏ trống !!!' }],
                })(
                    <Select>
                        <Option value="VND">VND</Option>
                        <Option value="USD">USD</Option>
                    </Select>
                )}
                </Form.Item>
            </Form>
            </div>
        );
      }
    },
);


class PricePolicy extends Component {
  constructor(props){
      super(props);
      this.onUpdateBtnClick = this.onUpdateBtnClick.bind(this);
  }

  onUpdateBtnClick = () => {
      const priceForm = this.priceFormRef.props.form;
      const currencyUnitForm = this.currencyUnitFormRef.props.form;
      priceForm.validateFields((err, priceValues) => {
        if (err) {
          return;
        }
        currencyUnitForm.validateFields((err, currencyUnitValues) => {
          if (err) {
              return;
          }
          const updatedHomepost = {
            ...this.props.homeposts.currentHomepost,
            currencyUnit: currencyUnitValues.currencyUnit,
            weekdayPrice: priceValues.weekdayPrice,
            weekendPrice: priceValues.weekdayPrice,
          }
          this.props.fetchUpdateHomepost(updatedHomepost);
          message.success('Cập nhật thành công');
          this.props.updateCurrentHomepost(updatedHomepost);
          currencyUnitForm.resetFields();
        });
        priceForm.resetFields();
      });

  }

  savePriceFormRef = formRef => {
      this.priceFormRef = formRef;
  };
  saveCurrencyUnitFormRef = formRef => {
      this.currencyUnitFormRef = formRef;
  };

  render(){
      return(
          <div className="container">
              <h3><b>Giá và các chính sách</b></h3>
              <Button onClick={this.onUpdateBtnClick} type='primary' style={{marginBottom: 10}}> 
                  Cập nhật
              </Button>
              <Divider/>
              <CurrencyUnitForm
                  wrappedComponentRef={this.saveCurrencyUnitFormRef}
                  homeposts={this.props.homeposts}
              />
              <Divider/>
              <PriceForm
                  wrappedComponentRef={this.savePriceFormRef}
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
  fetchUpdateHomepost: (homepost) => {dispatch(actions.fetchUpdateHomepost(homepost))},
  updateCurrentHomepost: (homepost) => {dispatch(actions.updateCurrentHomepost(homepost))},
});

export default connect(mapStateToProps, mapDispatchToProps)(PricePolicy);
