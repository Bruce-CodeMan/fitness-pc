/*
 * @Date: 2023-04-13 09:28:49
 * @Author: Bruce
 * @Description: 
 */
import { useRef } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { useQuery } from '@apollo/client';
import { GET_OSS_INFO } from '../../graphql/oss';

interface OSSDataType {
  dir: string;
  expire: string;
  host: string;
  accessId: string;
  policy: string;
  signature: string;
}

interface OSSUploadProps {
  value?: UploadFile;
  onChange?: (file?: UploadFile) => void;
}

const OSSImageUpload = ({ value, onChange }: OSSUploadProps) => {

  const key = useRef('');  

  const { data, refetch } = useQuery<{getOSSInfo: OSSDataType}>(GET_OSS_INFO);

  const OSSData = data?.getOSSInfo;

  const handleChange: UploadProps['onChange'] = ({ file }) => {
    if(file.status === 'removed') {
        onChange?.();
        return;
    }
    const newFile = {
        ...file,
        url: `${OSSData?.host}/${key.current}`
    }
    onChange?.(newFile);
  };

  const getExtraData: UploadProps['data'] = (file) => {
    const suffix = file.name.slice(file.name.lastIndexOf('.'))
    const filename = Date.now() + suffix;
    key.current = `${OSSData?.dir}/${filename}`
    return {
        key,
        OSSAccessKeyId: OSSData?.accessId,
        policy: OSSData?.policy,
        Signature: OSSData?.signature,
    }
  };

  const beforeUpload: UploadProps['beforeUpload'] = async (file) => {
    if (!OSSData) return false;

    const expire = Number(OSSData.expire) * 1000;

    if (expire < Date.now()) {
      await refetch();
    }

    return file;
  };

  return (
    <Upload
        name="file"
        fileList={value? [value]: []}
        action={OSSData?.host}
        onChange={handleChange}
        data={getExtraData}
        beforeUpload={beforeUpload}
    >
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
};

OSSImageUpload.defaultProps = {
    label: '上传图片',
    value: null,
    onChange: () => {},
    maxCount: 1,
    imgCropAspect: 1 / 1,
}

export default OSSImageUpload;