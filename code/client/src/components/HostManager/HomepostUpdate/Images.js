import React, {Component} from 'react';
import {Upload, Icon, Modal, Button, message} from 'antd';
import axios, {post} from 'axios';
import {baseUrl} from '../../../shared/baseUrl';
import {connect} from 'react-redux';
import * as actions from '../../../redux/ActionCreators';

const getTypeFile = (name) => {
  let res = name.split('.');
  return '.' + res[res.length - 1];
}

const formFileLst = (lst) => {
  let res = []
  lst.forEach((img, idx) => {
    res.push({
      uid: -idx-1,
      thumbUrl: baseUrl + img
    })
  })
  return res
}

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

class Images extends Component {
    constructor(props){
      super(props);
      this.state = {
          previewVisible: false,
          previewImage: '',
          lstImgs: this.props.homeposts.currentHomepost.image,
          fileList: formFileLst(this.props.homeposts.currentHomepost.image)
      }
      this.onUpdateBtnClick = this.onUpdateBtnClick.bind(this);
      this.uploadFile = this.uploadFile.bind(this);
    }

    uploadFile = (file, idx, arr) => {
      const url = baseUrl + 'upload';
      const formData = new FormData();
      const date = Date.now();
      if (file.status === 'done') {
        getBase64(file.originFileObj, imageUrl => {
          fetch(imageUrl)
          .then(res => res.blob())
          .then(blob => {
            formData.append('image', blob, date + '_' + idx + '_' + 
                                      this.props.homeposts.currentHomepost._id + '_' + getTypeFile(file.name));
            const config = {
                headers: {
                    "Content-type": "multipart/form-data",
                }
            }
            post(url, formData, config)
            .then((resp)=> {
              let l = this.state.lstImgs
              l.push('images/' + date + '_' + idx + '_' + 
                                    this.props.homeposts.currentHomepost._id + '_' + getTypeFile(file.name));
              this.setState({
                lstImgs: l
              });
              if (arr.length === idx + 1){
                const updatedHomepost = {
                  ...this.props.homeposts.currentHomepost,
                  image: this.state.lstImgs
                }
                this.props.fetchUpdateHomepost(updatedHomepost);
                message.success('Cập nhật thành công');
                this.props.updateCurrentHomepost(updatedHomepost);
              }
            })
          })
        })
      }
    }

    onUpdateBtnClick = () => {
      this.state.fileList.forEach(this.uploadFile);
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
                    background: '#f1f1f1'}}>
            <div style={{paddingBottom: 20}}>
            <h3><b>Tải lên ít nhất 5 ảnh mô tả homestay của bạn</b></h3>
            <Button onClick={this.onUpdateBtnClick } type='primary'> 
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
                {fileList.length >= 5 ? null : uploadButton}
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
