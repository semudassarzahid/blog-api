import { Injectable } from '@nestjs/common';
import {
  UploadApiErrorResponse,
  UploadApiOptions,
  UploadApiResponse,
  v2 as cloudinary,
} from 'cloudinary';
import { FileUpload } from 'graphql-upload-minimal';
import { generateRandomString } from '../utils/app.utils';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CloudinaryService {
  private options: UploadApiOptions = {
    folder: 'samples/people/',
    use_filename: true,
  };

  /**
   * @param configService
   */
  constructor(configService: ConfigService) {
    cloudinary.config({
      cloud_name: configService.get('cloudinary_name'),
      api_key: configService.get('cloudinary_api_key'),
      api_secret: configService.get('cloudinary_api_secret'),
    });
  }

  /**
   * @param file
   */
  async uploadStream(file: FileUpload): Promise<UploadApiResponse> {
    const { createReadStream, filename } = file;
    const extension = filename.split('.')[1];
    this.options.filename_override = `${generateRandomString(
      10,
    )}_${Date.now()}`;
    const stream = createReadStream();
    return await new Promise((resolve, reject) => {
      const streamLoad = cloudinary.uploader.upload_stream(
        this.options,
        (error: UploadApiErrorResponse, result: UploadApiResponse) => {
          if (result) {
            resolve(result);
          } else {
            reject(error.message);
          }
        },
      );

      stream.pipe(streamLoad);
    });
  }

  /**
   * @param file
   */
  async uploadFile(file: string): Promise<string> {
    this.options.filename_override = file;
    const path = join(process.cwd(), 'public/uploads/' + file);
    const result = await cloudinary.uploader.upload(path, this.options);
    return result.secure_url;
  }

  /**
   * @param file
   */
  async uploadLargeFile(file: FileUpload): Promise<string> {
    const { createReadStream, filename } = file;
    const extension = filename.split('.')[1];

    const stream = createReadStream();
    return await new Promise((resolve, reject) => {
      const streamLoad = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result.secure_url);
        } else {
          reject(error.message);
        }
      });

      stream.pipe(streamLoad);
    });
  }

  /**
   * @param public_id
   */
  async removeFile(public_id: string): Promise<boolean> {
    return await new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(public_id, (error, result) => {
        if (error) {
          reject(error.message);
        } else {
          resolve(result.result === 'ok');
        }
      });
    });
  }

  /**
   *
   */
  async getFolderResources() {
    try {
      const result = await cloudinary.search
        .expression('folder:samples/people')
        .execute();
      return result.resources;
    } catch (error) {
      console.error(error);
    }
  }
}
