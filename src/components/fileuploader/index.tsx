import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Typography, List, ListItem, ListItemText } from '@mui/material';

interface FileUploadProps {
  value?: File[];  
  onChange?: (files: File|null) => void; 
}

const FileUpload = ({ value, onChange }: FileUploadProps) => {
  const [files, setFiles] = useState<File| null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles[0]; 
    setFiles(newFiles);
    onChange?.(newFiles);  
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "application/msword": [".doc"],
      "text/plain": [".txt"],
      'text/csv': ['.csv'],
    },
  });

  return (
    <div
      {...getRootProps()}
      style={{
        padding: '16px',
        border: '2px dashed #1976d2',
        borderRadius: '8px',
        textAlign: 'center',
        backgroundColor: '#fff',
        cursor: 'pointer',
        transition: 'border-color 0.3s',
      }}
    >
      <input {...getInputProps()} className="hidden" />
      
      <Typography variant="body1" color="textSecondary" mb={2}>
        Drag and drop a file here, or click to upload
      </Typography>
      
      <Button variant="contained" color="primary" component="span">
        Choose File
      </Button>

      {files  && (
        <List sx={{ marginTop: 2 }}>
            <ListItem  sx={{ borderBottom: '1px solid #ddd', paddingY: 1 }}>
              <ListItemText
                primary={files.name}
                secondary={`${(files.size / 1024).toFixed(2)} KB`}
              />
            </ListItem>
        </List>
      )}
    </div>
  );
};

export default FileUpload;
