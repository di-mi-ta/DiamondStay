import React, {Component} from 'react';
import {Button, Modal, Input, Form, Menu, Select, InputNumber} from 'antd';
import {Link, Switch, Route, withRouter} from 'react-router-dom';
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
          form.resetFields();
          this.setState({ visible: false });
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    render(){
        return(
            <div style={{paddingTop: 30, paddingLeft: 50, paddingRight: 50,
                        paddingBottom: 50, background: '#f1f1f1'}}>

                <Button type="primary" icon="plus" ghost
                    onClick = {this.showModal}
                    style={{marginBottom: '20px'}}
                >
                    Thêm chỗ ở mới
                </Button>
                <h2> <b> Chỗ ở của tôi </b></h2>
                <Menu
                    defaultSelectedKeys={['1']}
                    mode= "horizontal"
                    theme= 'light'
                    style={{
                        textAlign: 'center',
                        background: "#F1F1F1"
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
