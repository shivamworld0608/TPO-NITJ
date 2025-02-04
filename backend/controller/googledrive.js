import fs from 'fs';
import { google } from 'googleapis';
import apikeys from '../gdrive.json' with { type: 'json' };
const SCOPES = ['https://www.googleapis.com/auth/drive'];

async function authorize() {
  const auth = new google.auth.JWT(
    apikeys.client_email,
    null,
    apikeys.private_key,
    SCOPES
  );

  try {
    await auth.authorize();
    return auth;
  } catch (error) {
    throw new Error(`Error authorizing Google Drive API: ${error.message}`);
  }
}

async function uploadFile(auth, filePath, folderId) {
  const drive = google.drive({ version: 'v3', auth });

  const fileMetadata = {
    name: filePath.split('/').pop(), // Extract file name from path
    parents: [folderId], // Folder ID to upload the file into
  };

  const media = {
    mimeType: 'application/octet-stream',
    body: fs.createReadStream(filePath), // Readable stream for file upload
  };

  try {
    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id',
    });

    console.log('File uploaded successfully. File ID:', response.data.id);
    return response.data;
  } catch (error) {
    throw new Error(`Error uploading file to Google Drive: ${error.message}`);
  }
}

const FOLDER_ID_HERE = '1eng1doy8f_aZr1mlwgg7ljsxCn9juzud';

export const gdrive = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const authClient = await authorize();
    const uploadedFile = await uploadFile(authClient, req.file.path, FOLDER_ID_HERE);

    // Delete the file from the local 'uploads' folder after uploading to Google Drive
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      }
    });

    // Return the Google Drive file ID or URL to the frontend
    res.status(200).json({
      message: 'File uploaded successfully!',
      fileId: uploadedFile.id,
      fileUrl: `https://drive.google.com/file/d/${uploadedFile.id}/view`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to upload file.', error: error.message });
  }
};