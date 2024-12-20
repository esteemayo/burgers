import { uploadImage } from '@/services/uploadService';

export const upload = async (file: File | undefined) => {
  const data = new FormData();

  data.append('file', file!);
  data.append('upload_preset', 'burgers');

  try {
    const res = await uploadImage(data);

    const { url } = res.data;
    return url;
  } catch (err: unknown) {
    console.log(err);
  }
};
