import React, {Component} from 'react';
import {Button, Input, Form, Select, InputNumber, Divider, message, Row, Col, Card} from 'antd';
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
              <Form.Item label={<b>Giá cơ bản</b>}>
                {getFieldDecorator('weekdayPrice', {
                  initialValue: this.props.homeposts.currentHomepost ? 
                                this.props.homeposts.currentHomepost.weekdayPrice : '',
                  rules: [{ required: true, message: 'Trường này không được bỏ trống !!!' }],
                })(
                    <InputNumber min='0' style={{width: '100%'}}/>

                )}
              </Form.Item>
              <Form.Item label={<b>Giá cuối tuần</b>}>
                {getFieldDecorator('weekendPrice', {
                  initialValue: this.props.homeposts.currentHomepost ? 
                                this.props.homeposts.currentHomepost.weekendPrice : '',
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
               <Form.Item label={<b>Đơn vị tiền tệ</b>}>
                {getFieldDecorator('currencyUnit', {
                  initialValue: this.props.homeposts.currentHomepost ? 
                                this.props.homeposts.currentHomepost.currencyUnit : '',
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
              <Row>
                <Col span={6}> 
                  <h3><b>Giá và các chính sách</b></h3> 
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
                <CurrencyUnitForm
                    wrappedComponentRef={this.saveCurrencyUnitFormRef}
                    homeposts={this.props.homeposts}
                />
              </Card>

              <Card style={{
                        width: '100%', padding: 10, 
                        marginTop: 10, marginBottom: 10,
                        boxShadow: '0 8px 12px rgba(0,0,0,.1)',}}>
                <PriceForm
                    wrappedComponentRef={this.savePriceFormRef}
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

export default connect(mapStateToProps, mapDispatchToProps)(PricePolicy);
