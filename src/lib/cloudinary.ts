import { v2 as cloudinary } from "cloudinary";
import { promises } from "dns";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
}
export const uploadCloudinary = async (file: Blob | null) => {
  try {
    console.log({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret_exists: !!process.env.CLOUDINARY_API_SECRET,
    });
    if (!file) throw new Error("file is missing")
    const bytes = await file?.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const result = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "pari/products" },
          (error, result) => {
            if (error) {
              reject(error)
            }
            else {
              resolve(result as CloudinaryUploadResult)
            }
          }
        )
        uploadStream.end(buffer)
      }
    )
    return {
      public_id: result.public_id,
      url: result.secure_url,
    }

  } catch (error) {
    throw error;
  }
}

export { cloudinary }
export default uploadCloudinary
