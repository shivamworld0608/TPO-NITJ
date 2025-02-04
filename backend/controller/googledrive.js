import fs from 'fs';
import { google } from 'googleapis';
const SCOPES = ['https://www.googleapis.com/auth/drive'];

async function authorize() {
  const auth = new google.auth.JWT(
    process.env.GOOGLE_CLIENT_EMAIL,
    null,
    process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
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
    name: filePath.split('/').pop(),
    parents: [folderId],
  };
  const media = {
    mimeType: 'application/octet-stream',
    body: fs.createReadStream(filePath),
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

export const gdrive = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const authClient = await authorize();
    const uploadedFile = await uploadFile(authClient, req.file.path, process.env.GOOGLE_DRIVE_FOLDER_ID);

    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      }
    });
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