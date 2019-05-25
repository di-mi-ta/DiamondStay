import React, {Component} from 'react';
import {Upload, Icon, Modal, Button, message} from 'antd';
import axios, {post} from 'axios';
import {baseUrl} from '../../../shared/baseUrl';
import {connect} from 'react-redux';
import * as actions from '../../../redux/ActionCreators';

const uploadFile = (file) => {
  const url = baseUrl + 'upload';
  const formData = new FormData();
  fetch(file)
  .then(res => res.blob())
  .then(blob => {
    const date = Date();
    formData.append('image', blob, (date + '_' + file.name).replace(/ /g,''));
    const config = {
        headers: {
            'Content-type': 'multipart/form-data',
            credentials: "same-origin"
        }
    }
    post(url, formData, config)
    .then((resp)=> {
      lstImgs.push('public/images/'+ (date + '_' + file.name).replace(/ /g,''))
    })
  })
}

let lstImgs = [];

class Images extends Component {
    constructor(props){
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: []
        }
        this.onUpdateBtnClick = this.onUpdateBtnClick.bind(this);
    }

    onUpdateBtnClick = () => {
      this.state.fileList.forEach(uploadFile);
      const updatedHomepost = {
        ...this.props.homeposts.currentHomepost,
        image: lstImgs
      }
      this.props.fetchUpdateHomepost(updatedHomepost);
      message.success('Cập nhật thành công');
      this.props.updateCurrentHomepost(updatedHomepost);
    }

    handleCancel = () => {
        this.setState({ previewVisible: false });
    }

    handlePreview = file => {
      this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true,
      });
    };

    handleChange = ({fileList}) => {
        this.setState({fileList});
    }

    render() {
      const {previewVisible, previewImage, fileList} = this.state;
      const uploadButton = (
        <div>
          <Icon type="plus" />
          <div className="ant-upload-text">Upload</div>
        </div>
      );
      return (
        <div style={{paddingRight: 50,
                    paddingLeft: 50,
                    paddingBottom: 50,
                    paddingTop: 20,
                    background: '#f1f1f1'}}>
            <div style={{paddingBottom: 20}}>
            <h3><b>Tải lên ít nhất 5 ảnh mô tả homestay của bạn</b></h3>
            <Button onClick={this.onUpdateBtnClick}>
                Cập nhật
            </Button>
            </div>
            <div className="clearfix">
            <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
            >
                {fileList.length >= 3 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Images);
