/*
 * @Date: 2023-04-13 09:28:49
 * @Author: Bruce
 * @Description: 
 */
import { useRef } from 'react';
import type { UploadProps } from 'antd';
import { Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { useQuery } from '@apollo/client';
import { GET_OSS_INFO } from '../../graphql/oss';
import ImgCrop from 'antd-img-crop';

interface OSSDataType {
  dir: string;
  expire: string;
  host: string;
  accessId: string;
  policy: string;
  signature: string;
}

interface OSSUploadProps {
  label?: string;
  maxCount?: number;
  value?: UploadFile[];
  imgCropAspect?: number;
  onChange?: (files?: UploadFile[]) => void;
}

const OSSImageUpload = ({ label, maxCount, value, imgCropAspect, onChange }: OSSUploadProps) => {

  const { data, refetch } = useQuery<{getOSSInfo: OSSDataType}>(GET_OSS_INFO);

  const OSSData = data?.getOSSInfo;

  const getKey = (file: UploadFile) => {
    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const key = `${OSSData?.dir}${file.uid}${suffix}`;
    const url = `${OSSData?.host}/${key}`;

    return { key, url }
  }

  const handleChange: UploadProps['onChange'] = ({ fileList }) => {
    const files = fileList.map((f) =>({
      ...f,
      url: getKey(f).url
    }))
    onChange?.(files);
  };

  const getExtraData: UploadProps['data'] = (file) => {
    return {
        key: getKey(file).key,
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
    <ImgCrop rotationSlider aspect={imgCropAspect}>
    <Upload
        name="file"
        listType='picture-card'
        maxCount={maxCount}
        fileList={value}
        action={OSSData?.host}
        onChange={handleChange}
        data={getExtraData}
        beforeUpload={beforeUpload}
    >
      {label}
    </Upload>
    </ImgCrop>
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

