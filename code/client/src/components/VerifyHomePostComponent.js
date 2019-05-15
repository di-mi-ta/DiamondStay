import React, { Component } from 'react';
import { Steps, Icon, Button, Input, 
        Radio, Row, Col, Card,
        Modal, Table, Tag,
        message, Popover, Carousel} from 'antd';

import {Checkbox, Form} from 'semantic-ui-react'
import '../css/verifyHome.css';

const Step = Steps.Step;
const ButtonGroup = Button.Group;
const TextArea = Input.TextArea;
const RadioGroup = Radio.Group;


const columns = [{
    title: 'Trường thông tin',
    dataIndex: 'field',
    align: 'center',
    key: 'field',
    render: (text) => <b>{text}</b>
}, {
    title: 'Phản hồi',
    dataIndex: 'response',
    key: 'response',
    align: 'center',
    render: (text) => (<Popover content={text}><p>{text}</p></Popover>)
}, {
    title: 'Trạng thái',
    key: 'states',
    dataIndex: 'states',
    align: 'center',
    render: states => (
      <span>
        {states.map(state => {
          let color = state.length > 5 ? 'geekblue' : 'green';
          if (state === 'HỢP LỆ') {
            color = 'green';
          }
          else{
            color = 'volcano';
          }
          return <Tag color={color} key={state}>{state.toUpperCase()}</Tag>;
        })}
      </span>
    ),
}];
  
const data = [{
    key: 'field',
    field: 'Mô tả',
    response: 'Không có',
    states: ['HỢP LỆ'],
}, {
    key: 'field',
    field: 'Thông tin cơ bản',
    response: 'Không có',
    states: ['HỢP LỆ'],
},{
    key: 'field',
    field: 'Giá',
    response: 'Không có',
    states: ['KHÔNG HỢP LỆ'],
},{
    key: 'field',
    field: 'Phòng và giường',
    response: 'Không có',
    states: ['HỢP LỆ'],
}, {
    key: 'field',
    field: 'Vị trí',
    response: 'Không có',
    states: ['HỢP LỆ'],
}];


class VerifyHomepostComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentStep: 0,
            canBack: false,
            canNext: true,
            fieldVerify: 'Mô tả',
            valueRatio: -1,
            isOpenModal: false,
        }
        this.renderContent = this.renderContent.bind(this);
        this.onNextBtnClicked = this.onNextBtnClicked.bind(this);
        this.onBackBtnClicked = this.onBackBtnClicked.bind(this);
        this.onChangeRatio = this.onChangeRatio.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.onConfirmedClick = this.onConfirmedClick.bind(this);
        this.onRejectedClick = this.onRejectedClick.bind(this);
    }

    onChangeRatio(e){
        this.setState({
            valueRatio: e.target.value
        })
    }

    onCancelClick(){
        this.setState({
            isOpenModal: false
        })
    }

    onConfirmedClick(){
        this.setState({
            isOpenModal: false
        })
        message.success('Tin đăng đã được duyệt thành công');
    }

    onRejectedClick(){
        this.setState({
            isOpenModal: false
        })
        message.success('Tin đăng đã được duyệt thành công');
    }

    // render content 
    renderContent = () => {
        if (this.state.currentStep === 0){
            return(
                <div>
                    <h4><b>Mô tả</b></h4>
                    <Form>
                        <Form.Field>
                        <label>Tiêu đề</label>
                        <input value={'Tiêu đề'}/>
                        </Form.Field>
                        <Form.Field>
                        <label>Mô tả</label>
                        <input value={'Mô tả'}/>
                        </Form.Field>
                    </Form>
                </div>
            )
        }
        else if (this.state.currentStep === 1){
            return(
                <div>
                    <h4><b>Hình ảnh</b></h4>
                    <Carousel autoplay>
                        <div>
                        <h3>Image 1</h3>
                        </div>
                        <div>
                        <h3>Image 2</h3>
                        </div>
                        <div>
                        <h3>Image 3</h3>
                        </div>
                        <div>
                        <h3>Image 4</h3>
                        </div>
                    </Carousel>
                </div>
            )
        }
        else if (this.state.currentStep === 2){
            return(
                <div>
                    <h4><b>Thông tin cơ bản</b></h4>
                    <Form>
                        <Form.Field>
                        <label>Loại chỗ ở</label>
                        <input value={'Loại chỗ ở'}/>
                        </Form.Field>
                        <Form.Field>
                        <label>Loại phòng</label>
                        <input value={'Loại phòng'}/>
                        </Form.Field>
                        <Form.Field>
                        <label>Số khách tối đa</label>
                        <input value={'Số khách tối đa'}/>
                        </Form.Field>
                        <Form.Field>
                        <label>Diện tích chỗ ở</label>
                        <input value={'Diện tích chỗ ở'}/>
                        </Form.Field>
                    </Form>
                </div>
            )
        }
        else if (this.state.currentStep === 3){
            return(
                <div>
                    <h4><b>Giá</b></h4>
                    <Form>
                        <Form.Field>
                        <label>Giá cơ bản</label>
                        <input value={'Giá cơ bản'}/>
                        </Form.Field>
                        <Form.Field>
                        <label>Giá cuối tuần</label>
                        <input value={'Giá cuối tuần'}/>
                        </Form.Field>
                    </Form>
                </div>
            )
        }
        else if (this.state.currentStep === 4){
            return(
                <div>
                   <h4><b>Phòng và giường</b></h4>
                    <Form>
                        <Form.Field>
                        <label>Số phòng ngủ</label>
                        <input value={'Số phòng ngủ'}/>
                        </Form.Field>
                        <Form.Field>
                        <label>Số giường</label>
                        <input value={'Số giường'}/>
                        </Form.Field>
                        <Form.Field>
                        <label>Số  phòng tắm</label>
                        <input value={'Số  phòng tắm'}/>
                        </Form.Field>
                    </Form>
                </div>
            )
        }
        else if (this.state.currentStep === 5){
            return(
                <div>
                    <h4><b>Vị trí</b></h4>
                </div>
            )
        }
    }

    onNextBtnClicked = () => {
        if (this.state.currentStep + 1 === 6){
            this.setState({
               isOpenModal: true
            })
        }
        else {
            this.setState({
                canNext: true,
                canBack: true,
                currentStep: this.state.currentStep + 1,
                valueRatio: -1
             })
        }
    }

    onBackBtnClicked = () =>{
        if (this.state.currentStep - 1 === 0){
            this.setState({
               currentStep: this.state.currentStep - 1,
               canBack: false,
               canNext: true,
               valueRatio: -1
            })
        } 
        else{
            this.setState({
               currentStep: this.state.currentStep - 1,
               canBack: true,
               canNext: true, 
               valueRatio: -1
            })
        }
    }

    render(){
        return(
            <div style = {{paddingTop: 30, paddingLeft: 50, paddingRight: 50, 
                            paddingBottom: 50, background: '#f1f1f1'}}>
                <h2><b>Duyệt tin</b></h2>
                <Steps current={this.state.currentStep} style={{marginBottom: '10px'}}>
                    <Step title="Mô tả" />
                    <Step title="Hình ảnh" />
                    <Step title="Thông tin cơ bản" />
                    <Step title="Giá"/>
                    <Step title="Phòng và giường"/>
                    <Step title="Vị trí" />
                </Steps>
                <Row style={{paddingRight: '10px'}}>
                    <Col span={18} >
                        <Card style={{marginTop: '20px', 
                                    boxShadow: "1px 3px 1px #9E9E9E",
                                    marginRight: '10px',
                                    height: '400px',
                                    overflowY: 'scroll'}}>
                            {this.renderContent()}
                        </Card>
                    </Col>
                    <Col span={6} onBackClickstyle={{marginTop: '10px'}}>
                        <span>
                            <Card style={{marginTop: '20px', 
                                        textAlign:'center',
                                        boxShadow: "1px 3px 1px #9E9E9E",
                                        height: '100%',
                                        }} >
                                <h4><b>Phản hồi</b></h4>
                                <TextArea placeholder="Cung cấp phản hồi cho người dùng (nếu cần)" 
                                        rows={4}/>
                            </Card>
                            <Card style={{marginTop: '20px', 
                                        textAlign:'center', 
                                        boxShadow: "1px 3px 1px #9E9E9E",
                                        background: "#ffe4da"}} >
                            <h4><b>Xác nhận</b></h4>
                            <RadioGroup onChange={this.onChangeRatio} 
                                        value={this.state.valueRatio} 
                                        style = {{
                                            alignItems: 'center'
                                        }}
                            >
                                <Radio value={1} >Hợp lệ</Radio>
                                <Radio value={0}>Không hợp lệ</Radio>
                            </RadioGroup>
                            </Card>
                            <div align='center'>
                                <ButtonGroup style={{marginTop: '20px'}}>
                                    <Button type="primary" onClick={this.onBackBtnClicked} 
                                            disabled={!this.state.canBack}>
                                        <Icon type="left" />Quay lại
                                    </Button>
                                    <Button type="primary" onClick={this.onNextBtnClicked} 
                                            disabled={!this.state.canNext}>
                                        Tiếp theo <Icon type="right" />
                                    </Button>
                                </ButtonGroup>
                            </div>
                        </span>
                    </Col>
                </Row>
                <Modal
                    visible={this.state.isOpenModal}
                    title={<b>Xác nhận</b>}
                    onCancel={this.onCancelClick}
                    width='60%'
                    footer={[
                        <Button onClick={this.onConfirmedClick}> Chấp nhận tin </Button>,
                        <Button onClick={this.onRejectedClick}> Từ chối tin </Button>,
                        <Button onClick={this.onCancelClick}> Hủy bỏ </Button>,
                    ]}
                    >
                    <Table columns={columns} dataSource={data}  
                           pagination={{ pageSize: 5}} bordered/>
                </Modal>
            </div>
        )
    }
}

export default VerifyHomepostComponent;

