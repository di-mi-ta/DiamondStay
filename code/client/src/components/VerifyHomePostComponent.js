import React, { Component } from 'react';
import { Steps, Icon, Button, Input, 
        Radio, Row, Col, Card,
        Modal, Table, Tag,
        message, Popover} from 'antd';

const Step = Steps.Step;
const ButtonGroup = Button.Group;
const TextArea = Input.TextArea;
const RadioGroup = Radio.Group;


const columns = [{
    title: 'Trường thông tin',
    dataIndex: 'field',
    key: 'field',
}, {
    title: 'Phản hồi',
    dataIndex: 'response',
    key: 'response',
    render: (text) => (<Popover content={text}><p>{text}</p></Popover>)
}, {
    title: 'Trạng thái',
    key: 'states',
    dataIndex: 'states',
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
    field: 'Vị trí',
    response: 'Không có',
    states: ['HỢP LỆ'],
},{
    key: 'field',
    field: 'Hình ảnh',
    response: 'Không có',
    states: ['KHÔNG HỢP LỆ'],
},{
    key: 'field',
    field: 'Mô tả',
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
                    {/* TO DO */}
                </div>
            )
        }
        else if (this.state.currentStep === 1){
            return(
                <div>
                    {/* TO DO */}
                </div>
            )
        }
        else if (this.state.currentStep === 2){
            return(
                <div>
                    
                </div>
            )
        }
        else if (this.state.currentStep === 3){
            return(
                <div>
                    
                </div>
            )
        }
        else if (this.state.currentStep === 4){
            return(
                <div>
                    
                </div>
            )
        }
        else if (this.state.currentStep === 5){
            return(
                <div>
                    <h2>Vị trí </h2> 
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
            <div className='container'>
                <h2><b>Duyệt tin</b></h2>
                <Steps current={this.state.currentStep} style={{marginBottom: '20px'}}>
                    <Step title="Mô tả" />
                    <Step title="Hình ảnh" />
                    <Step title="Đặc điểm" />
                    <Step title="Giá"/>
                    <Step title="Tiện ích" />
                    <Step title="Vị trí" />
                </Steps>
                <Row style={{marginTop: '10px', background: '#FBF7F7', 
                            paddingTop: '10px', paddingRight: '10px', height: '300px'}}>
                    <Col span={12} style={{marginTop: '10px'}}>
                        {this.renderContent()}
                    </Col>
                    <Col span={12} onBackClickstyle={{marginTop: '10px', alignItems: 'center'}}>
                        <span>
                            <TextArea placeholder="Cung cấp phản hồi cho người dùng (nếu cần)" 
                                    autosize={{minRows: 2, maxRows: 30}} />
                            <RadioGroup onChange={this.onChangeRatio} 
                                        value={this.state.valueRatio} 
                                        style={{marginTop: '20px'}}
                            >
                                <Radio value={1} >Hợp lệ</Radio>
                                <Radio value={0}>Không hợp lệ</Radio>
                        </RadioGroup>
                        </span>
                    </Col>
                </Row>
                <div align="center">
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
                           pagination={{ pageSize: 5}}/>
                </Modal>
            </div>
        )
    }
}

export default VerifyHomepostComponent;
