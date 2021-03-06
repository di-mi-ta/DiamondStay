import React, {Component} from 'react';
import axios, { post } from 'axios';
import {baseUrl} from '../../shared/baseUrl'
import {connect} from 'react-redux';
import * as actions from '../../redux/ActionCreators';

import {Table, Divider, Button, Icon,
         Modal, Input, DatePicker,
         message, InputNumber, Tag,
         Popconfirm, Form, Card, Upload, Row, Col} from 'antd';

import moment from 'moment';

const RangePicker = DatePicker.RangePicker;

function beforeUpload(file) {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isLt2M;
}

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

const getTypeFile = (name) => {
    let res = name.split('.');
    return '.' + res[res.length - 1];
}

class SystemPromotionCompoment extends Component {
    constructor(props){
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOpen: false,
            isModalEditOpen: false,
            currentPromo: '',
            logo: null,
            imageUrl: null,
            fileName: ''
        };
        this.onAddPromoBtnClick = this.onAddPromoBtnClick.bind(this)
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.onConfirmDeleteClick = this.onConfirmDeleteClick.bind(this);
        this.onEditBtnClick = this.onEditBtnClick.bind(this);
        this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleMinValueChange = this.handleMinValueChange.bind(this);
        this.handleNumTimeChange = this.handleNumTimeChange.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.handleLogoChange = this.handleLogoChange.bind(this);
        this.handlemaxValueToReceiveChange = this.handlemaxValueToReceiveChange.bind(this);
    }

    handleLogoChange = info => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }

        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
              imageUrl: imageUrl,
              loading: false,
              fileName: info.file.name
            }),
          );
        }
    };

    componentWillMount(){
        this.props.fetchSystemPromos();
    }

    onLogoChange = e => {
        this.setState({logo: e.target.files[0]})
    }

    handleDatePickerChange = value => {
        this.setState({
            currentPromo: {...this.state.currentPromo, dateStart: value[0], dateEnd: value[1]}
        })
    }

    handlemaxValueToReceiveChange = value => {
        this.setState({
            currentPromo: {...this.state.currentPromo, maxValueToReceive: value}
        })
    }

    handleMinValueChange = value => {
        this.setState({
            currentPromo: {...this.state.currentPromo, minValueBooking: value}
        })
    }

    handleNumTimeChange = value => {
        this.setState({
            currentPromo: {...this.state.currentPromo, maxNumBookingApplied: value}
        })
    }

    handleCodeChange = e => {
        this.setState({
            currentPromo: {...this.state.currentPromo, code: e.target.value}
        })
    }

    handleValueChange  = value => {
        this.setState({
            currentPromo: {...this.state.currentPromo, value: value}
        })
    }

    handleNameChange  = e => {
        this.setState({
            currentPromo: {...this.state.currentPromo, name: e.target.value}
        })
    }


    columns = [{
        title: 'Tên khuyến mãi',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        render: text => text,
    },{
        title: 'Code',
        dataIndex: 'code',
        key: 'code',
        align: 'center',
        render: text => text,
    },{
        title: 'Tình trạng',
        key: 'states',
        dataIndex: 'dateEnd',
        align: 'center',
        render: (dateEnd, row) =>{
            let now = new Date();
            let dateStart = row.dateStart;
            if (now <= new Date(dateEnd) && now >= new Date(dateStart)){
                return <Tag color='green' > ĐANG DIỄN RA </Tag>
            }
            else if (now < new Date(dateStart)){
                return <Tag color='yellow' > TRONG TƯƠNG LAI </Tag>
            }
            else {
                return <Tag color='red' > ĐÃ KẾT THÚC </Tag>
            }
        }
    },{
        key: 'action',
        align: 'center',
        title: 'Hành động',
        render: (text, record) => (
          <span>
             <Popconfirm title="Bạn chắc chắn muốn xóa chứ？"
                        okText="Xóa" cancelText="Hủy bỏ"
                        onConfirm = {() => this.onConfirmDeleteClick(record)}>
                  <Button ghost> <Icon type="delete"
                        style={{ color: '#DC143C' }} theme="filled" /> </Button>
             </Popconfirm>
            <Divider type="vertical"/>
            <Button ghost onClick={()=> {this.setState({currentPromo: record, imageUrl: baseUrl + record.logoPath}); this.onEditBtnClick()}}>
                <Icon type="edit" style={{ color: '#FF8C00' }}
                    theme="filled"/>
            </Button>
          </span>
        ),
    }];

    onEditBtnClick = () => {
        this.setState({
            isModalEditOpen: true,
        })
    }

    onConfirmDeleteClick = (promo) => {
        this.props.fetchDeleteSystemPromo(promo._id)
    }

    onAddPromoBtnClick(){
        this.setState({
            isModalOpen: true,
        });
    }

    handleOkEdit = () => {
        this.setState({
          isModalEditOpen: false,
        });
        const url = baseUrl + 'upload';
        const formData = new FormData();
        fetch(this.state.imageUrl)
          .then(res => res.blob())
          .then(blob => {
            formData.append('image', blob, this.state.currentPromo._id + getTypeFile(this.state.fileName));
            const config = {
                headers: {
                    "Content-type": "multipart/form-data",
                }
            }
            post(url, formData, config)
            .then((resp)=> {
                const promo = {
                    ...this.state.currentPromo,
                    logoPath: 'images/' + this.state.currentPromo._id + getTypeFile(this.state.fileName),
                }
                this.props.fetchUpdateSystemPromo(promo);
                message.success('Cập nhật khuyến mãi thành công');            
            })
        })
    }


    handleCancelEdit = () => {
        this.setState({
            isModalEditOpen: false,
            imageUrl: ''
        });
    }

    handleOk = (e) => {
        this.setState({
          isModalOpen: false,
        });
        const url = baseUrl + 'upload';
        const formData = new FormData();
        fetch(this.state.imageUrl)
          .then(res => res.blob())
          .then(blob => {
            formData.append('image', blob, this.state.currentPromo._id + getTypeFile(this.state.fileName));
            const config = {
                headers: {
                    "Content-type": "multipart/form-data",
                }
            }
            post(url, formData, config)
            .then((resp)=> {
                const promo = {
                    ...this.state.currentPromo,
                    logoPath: 'images/' + this.state.currentPromo._id + getTypeFile(this.state.fileName),
                    creator: this.props.auth.user.username
                }
                this.props.fetchCreateSystemPromo(promo);
                message.success('Tạo khuyến mãi mới thành công!');            
            })
        })
    }

    handleCancel = (e) => {
        this.setState({
            isModalOpen: false,
            imageUrl: '',
            currentPromo: ''
        });
    }

    render(){
        const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">Upload</div>
            </div>
        );
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        }
        return(
            <div style={{paddingTop: 30, paddingLeft: 50, paddingRight: 50,
                        paddingBottom: 50}}>
                <Row>
                  <Col span={6}> 
                    <h3> <b> Quản lí khuyến mại </b></h3>
                  </Col>
                  <Col span={6} offset={12}>
                    <Button style={{boxShadow: '0 8px 12px rgba(0,0,0,.1)'}}
                             icon="plus" 
                        onClick = {this.onAddPromoBtnClick}
                    >
                        Thêm khuyến mại
                </Button>
                  </Col>
                </Row>            
                <Divider/>
                <Card style={{
                    boxShadow: '0 8px 12px rgba(0,0,0,.1)',
                    minHeight: '300px',
                    marginTop: '30px'}}>
                    <Table columns={this.columns}
                        dataSource={this.props.promotions.systemPromos}
                        style={{marginTop: '20px', backgroundColor: 'while'}}
                        bordered
                    />
                </Card>
                <Modal
                    title="Thêm khuyến mại"
                    visible={this.state.isModalOpen}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width='60%'
                    okText='Thêm'
                    cancelText='Hủy bỏ'
                >
                    <Form layout='Horizontal' style={{ width: '100%'}} onSubmit={this.handleSubmit}>
                        <Form.Item
                            label="Tên khuyến mãi"
                            {...formItemLayout}
                        >
                            <Input onChange={this.handleNameChange}/>
                        </Form.Item>
                        <Form.Item
                            label="Logo"
                            {...formItemLayout}
                        >
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                beforeUpload={beforeUpload}
                                onChange={this.handleLogoChange}
                            >
                                {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" /> : uploadButton}
                            </Upload>
                        </Form.Item>
                        <Form.Item
                            label="Code"
                            {...formItemLayout}
                        >
                            <Input onChange={this.handleCodeChange}/>
                        </Form.Item>
                        <Form.Item
                            label="Giá trị booking tối thiểu"
                            {...formItemLayout}
                        >
                            <InputNumber min='0' onChange={this.handleMinValueChange} style ={{width: '90%'}}/>
                            {'  VND'}
                        </Form.Item>
                        <Form.Item
                            label="Giá trị khuyến mãi"
                            {...formItemLayout}
                        >
                            <InputNumber min='0' onChange={this.handleValueChange}  style ={{width: '90%'}}/>
                            {'  %'}
                        </Form.Item>
                        <Form.Item
                            label="Giá trị khuyến mãi tối đa"
                            {...formItemLayout}
                        >
                            <InputNumber min='0' onChange={this.handlemaxValueToReceiveChange}
                                                value={this.state.currentPromo.maxValueToReceive}
                                                style ={{width: '90%'}}/>
                            {' VND'}
                        </Form.Item>
                        <Form.Item
                            label="Số lần sử dụng tối đa"
                            {...formItemLayout}
                        >
                            <InputNumber min='0' onChange={this.handleNumTimeChange}
                                        style ={{width: '100%'}}/>
                        </Form.Item>
                        <Form.Item
                            label="Thời gian áp dụng"
                            {...formItemLayout}
                        >
                            <RangePicker style={{ width: '100%' }}
                                        onChange={this.handleDatePickerChange}/>
                        </Form.Item>
                        </Form>
                </Modal>

                <Modal
                    title="Chỉnh sửa khuyến mãi"
                    visible={this.state.isModalEditOpen}
                    onOk={this.handleOkEdit}
                    onCancel={this.handleCancelEdit}
                    width='60%'
                    okText='Cập nhật'
                    cancelText='Hủy bỏ'
                >
                <Form layout='Horizontal' style={{ width: '100%'}} onSubmit={this.handleSubmit}>
                        <Form.Item
                            label="Tên khuyến mãi"
                            {...formItemLayout}
                        >
                            <Input onChange={this.handleNameChange} value={this.state.currentPromo.name}/>
                        </Form.Item>
                        <Form.Item
                            label="Logo"
                            {...formItemLayout}
                        >
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                beforeUpload={beforeUpload}
                                onChange={this.handleLogoChange}
                            >
                                {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" /> : uploadButton}
                            </Upload>
                        </Form.Item>
                        <Form.Item
                            label="Code"
                            {...formItemLayout}
                        >
                            <Input onChange={this.handleCodeChange} value={this.state.currentPromo.code}/>
                        </Form.Item>
                        <Form.Item
                            label="Giá trị booking tối thiểu"
                            {...formItemLayout}
                        >
                            <InputNumber min='0' onChange={this.handleMinValueChange}
                                        value={this.state.currentPromo.minValueBooking}
                                        style ={{width: '90%'}}/>
                            {' VND'}
                        </Form.Item>
                        <Form.Item
                            label="Giá trị khuyến mãi"
                            {...formItemLayout}
                        >
                            <InputNumber min='0' onChange={this.handleValueChange}
                                                value={this.state.currentPromo.value}
                                                style ={{width: '90%'}}/>
                            {' %'}
                        </Form.Item>
                        <Form.Item
                            label="Giá trị khuyến mãi tối đa"
                            {...formItemLayout}
                        >
                            <InputNumber min='0' onChange={this.handlemaxValueToReceiveChange}
                                                value={this.state.currentPromo.maxValueToReceive}
                                                style ={{width: '90%'}}/>
                            {' VND'}
                        </Form.Item>
                        <Form.Item
                            label="Số lần sử dụng tối đa"
                            {...formItemLayout}
                        >
                            <InputNumber min='0' onChange={this.handleNumTimeChange}
                                                value={this.state.currentPromo.maxNumBookingApplied}
                                                style ={{width: '100%'}}/>
                        </Form.Item>
                        <Form.Item
                            label="Thời gian áp dụng"
                            {...formItemLayout}
                        >
                            <RangePicker style={{ width: '100%' }}
                                        onChange={this.handleDatePickerChange}
                                        format="DD-MM-YYYY"
                                        value={[moment(this.state.currentPromo.dateStart),
                                        moment(this.state.currentPromo.dateEnd)]}
                            />
                        </Form.Item>
                        </Form>
                </Modal>
            </div>
        )
    }

}

const mapStateToProps = state => ({
  auth: state.auth,
  promotions: state.promotions,
});

const mapDispatchToProps = (dispatch) => ({
  fetchSystemPromos: () => {dispatch(actions.fetchSystemPromos())},
  fetchUpdateSystemPromo: (updatedPromo) => dispatch(actions.fetchUpdateSystemPromo(updatedPromo)),
  fetchDeleteSystemPromo: (promoId) => dispatch(actions.fetchDeleteSystemPromo(promoId)),
  fetchCreateSystemPromo: (promo) => dispatch(actions.fetchCreateSystemPromo(promo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SystemPromotionCompoment);
