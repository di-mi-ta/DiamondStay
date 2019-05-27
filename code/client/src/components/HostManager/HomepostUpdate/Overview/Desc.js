import React, {Component} from 'react';
import {Button, Input, Form, Row, Divider, Card, Col} from 'antd';
import {connect} from 'react-redux';
import * as actions from '../../../../redux/ActionCreators';

const DescForm = Form.create({ name: 'desc' })(
    class extends React.Component {
      render() {
        const { form } = this.props;
        const { getFieldDecorator, setFieldsValue } = form;
        return (
            <Form  layout="vertical">
              <Form.Item label={<b>Tiêu đề</b>}>
                {getFieldDecorator('name',
                  { initialValue: this.props.homeposts.currentHomepost ? this.props.homeposts.currentHomepost.name : '',
                    rules: [{ required: true, message: 'Vui lòng nhập tên chỗ ở !!!',
                    }],
                })(
                  <Input/>
                )}
              </Form.Item>
              <Form.Item label={<b>Mô tả</b>}>
                {getFieldDecorator('description',
                  { initialValue: this.props.homeposts.currentHomepost 
                                  ? this.props.homeposts.currentHomepost.description : '',
                    rules: [{required: false}],
                })(
                  <Input.TextArea rows={8} />
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
              <Row>
                <Col span={6}> 
                  <h3><b>Thông tin cơ bản</b></h3>
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
              <DescForm
                  wrappedComponentRef={this.saveFormRef}
                  onCancel={this.handleCancel}
                  onCreate={this.handleCreate}
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

export default connect(mapStateToProps, mapDispatchToProps)(Desc);
