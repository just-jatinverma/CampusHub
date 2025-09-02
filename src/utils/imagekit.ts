import ImageKit from 'imagekit';
import fs from 'fs';
import { constants } from '../config/constants';

const imagekit = new ImageKit({
  publicKey: constants.imageKitPublicKey as string,
  privateKey: constants.imageKitPrivateKey as string,
  urlEndpoint: constants.imageKitUrlEndpoint as string,
});

const uploadOnImageKit = async (localFilePath: string) => {
  try {
    if (!localFilePath) return null;

    const fileBuffer = fs.readFileSync(localFilePath);
    const fileName = localFilePath.split('/').pop();

    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: fileName as string,
    });

    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    console.error('Error uploading to ImageKit', error);
    return null;
  }
};

const deleteFromImageKit = async (fileId: string) => {
  try {
    const response = await imagekit.deleteFile(fileId);
    return response;
  } catch (error) {
    console.error('Error deleting to ImageKit', error);
    return null;
  }
};

export { uploadOnImageKit, deleteFromImageKit };
