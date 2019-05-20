import React, {Component} from 'react';
import { Upload, Icon, Modal, Button } from 'antd';

class Images extends Component {

    constructor(props){
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: [
                {
                    uid: '-1',
                    name: 'xxx.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                },
            ],
        }
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
      const { previewVisible, previewImage, fileList } = this.state;
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
            <Button> 
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

export default Images;