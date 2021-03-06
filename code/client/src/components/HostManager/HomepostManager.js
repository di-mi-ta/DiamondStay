import React, {Component} from 'react';
import {Button, Modal, Input, Form, Menu, Select, InputNumber, message, Row, Col} from 'antd';
import {Link, Switch, Route, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../redux/ActionCreators';
import Waiting from './HomepostManager/Waiting';
import Open from './HomepostManager/Open'
import Reject from './HomepostManager/Reject'
import All from './HomepostManager/All'
import Close from './HomepostManager/Close'
import NewHomepost from './HomepostManager/NewHomepost'

const Option = Select.Option;

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    class extends React.Component {
      render() {
        const { visible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = form;
        return (
          <Modal
            visible={visible}
            title="Thêm chỗ ở mới"
            okText="Tạo mới"
            cancelText='Hủy bỏ'
            onCancel={onCancel}
            onOk={onCreate}
          >
            <Form  layout="vertical">
              <Form.Item label="Tên chỗ ở">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Vui lòng nhập tên chỗ ở !!!' }],
                })(<Input />)}
              </Form.Item>
              <Form.Item label="Loại chỗ ở">
                {getFieldDecorator('typeHome', {
                  rules: [{ required: true, message: 'Vui lòng chọn loại chỗ ở !!!' }],
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
              <Form.Item label="Loại phòng">
                {getFieldDecorator('typeRoom', {
                  rules: [{ required: true, message: 'Vui lòng chọn loại phòng !!!' }],
                })(
                    <Select>
                        <Option value="Nguyên căn">Nguyên căn</Option>
                        <Option value="Phòng riêng">Phòng riêng</Option>
                    </Select>
                )}
              </Form.Item>
              <Form.Item label="Số khách tiêu chuẩn"> 
                {getFieldDecorator('basicPeoples', {
                  rules: [{ required: true, message: 'Vui lòng nhập trường này !!!' }],
                })(<InputNumber min='0' style={{width: '100%'}}/>)}
              </Form.Item>
              <Form.Item label="Số khách tối đa">
                {getFieldDecorator('maxPeoples', {
                  rules: [{ required: true, message: 'Vui lòng nhập trường này !!!' }],
                })(<InputNumber min='0' style={{width: '100%'}}/>)}
              </Form.Item>
            </Form>
          </Modal>
        );
      }
    },
);

class HomepostManager extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
        };
    }

    componentWillMount(){
      this.props.fetchHomeposts();
    }

    showModal = () => {
        this.setState({ visible: true });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
          if (err) {
            return;
          }
          const homepost = {
            owner: this.props.auth.user.username,
            typeHome: values.typeHome,
            typeRoom: values.typeRoom,
            maxPeoples: values.maxPeoples,
            basicPeoples: values.basicPeoples,
            name: values.name,
          }
          this.props.fetchCreateHomepost(homepost);
          message.success('Tạo chỗ ở mới thành công. Vui lòng cập nhật các thông tin cần thiết về nhà trước khi gửi yêu cầu duyệt !!!')
          this.setState({ visible: false });
          this.props.history.push('/host/my-homes/new-home');
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    render(){
        return(
            <div style={{paddingTop: 30, paddingLeft: 50, paddingRight: 50,
                        paddingBottom: 30}}>              
                <Row>
                  <Col span={6}> 
                    <h3> <b> Chỗ ở của tôi </b></h3>
                  </Col>
                  <Col span={6} offset={12}>
                    <Button icon="plus"
                        onClick = {this.showModal}
                        style={{marginBottom: 20, boxShadow: '0 8px 12px rgba(0,0,0,.1)'}}
                    >
                        Thêm chỗ ở mới
                    </Button>
                  </Col>
                </Row>
                <Menu
                    mode= "horizontal"
                    theme= 'light'
                    style={{
                        textAlign: 'center',
                        boxShadow: '0 8px 12px rgba(0,0,0,.1)'
                    }}
                >
                    <Menu.Item key="1" to='/'>
                        <Link to='/host/my-homes/all'>
                        <span>
                            <b>Tất cả</b>
                        </span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to='/host/my-homes/new-home'>
                        <span>
                            <b>Chỗ ở mới</b>
                        </span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to='/host/my-homes/open'>
                        <span>
                            <b>Mở</b>
                        </span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link to='/host/my-homes/close'>
                        <span> <b>Đóng</b> </span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Link to='/host/my-homes/waiting' >
                        <span><b>Chờ duyệt</b></span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="6" >
                        <Link to='/host/my-homes/reject' >
                            <span> <b>Bị từ chối</b> </span>
                        </Link>
                    </Menu.Item>
                </Menu>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
                <Switch>
                    <Route path="/host/my-homes/all" component={All} />
                    <Route path="/host/my-homes/close" component={Close} />
                    <Route path="/host/my-homes/new-home" component={NewHomepost} />
                    <Route path="/host/my-homes/open" component={Open} />
                    <Route path="/host/my-homes/reject" component={Reject} />
                    <Route path="/host/my-homes/waiting" component={Waiting} />
                    <Redirect to='/host/my-homes/all'/>
                </Switch>
            </div>
        )
    }

}

const mapStateToProps = state => ({
  auth: state.auth,
  homeposts: state.homeposts,
});

const mapDispatchToProps = (dispatch) => ({
  fetchHomeposts: (query='') => {dispatch(actions.fetchHomeposts(query))},
  fetchCreateHomepost: (homepost) => {dispatch(actions.fetchCreateHomepost(homepost))},
  fetchUpdateHomepost: (homepost) => {dispatch(actions.fetchUpdateHomepost(homepost))},
  updateCurrentHomepost: (homepost) => {dispatch(actions.updateCurrentHomepost(homepost))},
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomepostManager));
