import { useState } from 'react';

/**
 * Custom hook for uploading images to Cloudinary
 * @param {string} cloudName - Your Cloudinary cloud name
 * @param {string} uploadPreset - Your Cloudinary upload preset (must be unsigned)
 * @returns {Object} - Upload state and functions
 */
export function useCloudinaryUpload(cloudName = 'your-cloud-name', uploadPreset = 'your-upload-preset') {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);

  /**
   * Upload a single file to Cloudinary
   * @param {File} file - The file to upload
   * @returns {Promise<Object>} - The upload response from Cloudinary
   */
  const uploadFile = async (file) => {
    if (!file) {
      throw new Error('No file provided');
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'video/mp4', 'video/mov'];
    if (!validTypes.includes(file.type)) {
      throw new Error('Invalid file type. Only JPG, PNG, GIF, MP4, and MOV are allowed.');
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      throw new Error('File size exceeds 10MB limit');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
      setUploading(true);
      setError(null);
      setUploadProgress(0);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Upload failed');
      }

      const data = await response.json();
      setUploadProgress(100);
      
      return {
        url: data.secure_url,
        publicId: data.public_id,
        format: data.format,
        resourceType: data.resource_type,
        bytes: data.bytes,
        width: data.width,
        height: data.height,
      };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setUploading(false);
    }
  };

  /**
   * Upload multiple files to Cloudinary
   * @param {FileList|Array<File>} files - The files to upload
   * @returns {Promise<Array<Object>>} - Array of upload responses
   */
  const uploadMultipleFiles = async (files) => {
    const fileArray = Array.from(files);
    const uploadPromises = fileArray.map(file => uploadFile(file));
    return Promise.all(uploadPromises);
  };

  /**
   * Reset the upload state
   */
  const reset = () => {
    setUploading(false);
    setUploadProgress(0);
    setError(null);
  };

  return {
    uploadFile,
    uploadMultipleFiles,
    uploading,
    uploadProgress,
    error,
    reset,
  };
}
