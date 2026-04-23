import axios from 'axios';

export type CloudinaryUploadResult = {
  url: string;
  publicId: string;
};

type UploadSignatureResponse = {
  cloudName: string;
  apiKey: string;
  folder: string;
  timestamp: string;
  signature: string;
};

export const uploadImageToCloudinary = async (
  file: File,
  folder = 'events',
): Promise<CloudinaryUploadResult> => {
  const signatureResponse = await axios.post<UploadSignatureResponse>(
    '/api/cloudinary/sign-upload',
    { folder },
  );

  const { cloudName, apiKey, signature, timestamp, folder: resolvedFolder } = signatureResponse.data;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', apiKey);
  formData.append('timestamp', timestamp);
  formData.append('signature', signature);
  formData.append('folder', resolvedFolder);

  const uploadEndpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const uploadResponse = await axios.post(uploadEndpoint, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return {
    url: uploadResponse.data.secure_url,
    publicId: uploadResponse.data.public_id,
  };
};
