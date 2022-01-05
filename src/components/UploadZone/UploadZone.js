import { useTheme } from '@emotion/react';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { styled, lighten } from '@mui/material/styles';
import {
  FaCheckCircle,
  FaCloudUploadAlt,
  FaTimes,
  FaTimesCircle
} from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useDropArea } from 'react-use';

const Input = styled('input')({
  display: 'none'
});

const FileBox = ({ file, selected = false, onImgClick, onDeleteClick }) => {
  const theme = useTheme();
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (!file) {
      setPreview(undefined);
      return;
    }

    if (!/^image\/[a-zA-Z]+$/i.test(file.type)) {
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return (
    <Box
      sx={{
        m: 1,
        height: '150px',
        width: '200px',
        position: 'relative',
        backgroundColor: lighten(theme.palette.grey[50], 0.5),
        borderRadius: 2,
        overflow: 'hidden',
        transition: 'all 0.15s ease',
        '&:hover': { cursor: 'pointer', transform: 'scale(1.1)' }
      }}>
      <IconButton
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          zIndex: 10000,
          color: 'common.white',
          backgroundColor: 'rgba(0,0,0,0.6)',
          width: '25px',
          height: '25px',
          m: 1,
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.4)'
          }
          // transform: 'translate(50%, -50%)'
        }}
        onClick={onDeleteClick}>
        <FaTimes />
      </IconButton>
      {/^image\/[a-zA-Z]+$/i.test(file.type) && (
        <Box>
          <img
            src={preview}
            alt='blah'
            style={{
              display: 'block',
              width: '200px',
              height: '150px',
              objectFit: 'cover',
              borderRadius: 2,
              overflow: 'hidden'
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.3)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: selected ? 1 : 0,
              transition: 'all 0.15s ease'
            }}
            onClick={onImgClick}>
            <FaCheckCircle fontSize={40} color='white' />
            <Typography variant='caption' color='common.white' sx={{ mt: 1 }}>
              Featured
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

const UploadZone = ({
  files = [],
  file,
  selectedFile,
  onFilesChange,
  onSelectedFileChange,
  accept = 'image/*',
  multiple = true,
  label1,
  label2
}) => {
  const theme = useTheme();
  const [isDragged, setIsDragged] = useState(false);
  const [bond, state] = useDropArea({
    onFiles: (f) => {
      setIsDragged(false);
      if (!onFilesChange) {
        return;
      }

      let newFilesList = f;

      if (!newFilesList || newFilesList.length === 0) {
        return;
      }

      let newFiles = files;
      for (let i = 0; i < newFilesList.length; i++) {
        newFiles.push(newFilesList[i]);
      }

      newFiles = Array.from(new Set(newFiles).values());

      onFilesChange(null, newFiles);
    }
  });
  const handleDragEnter = (event) => {
    setIsDragged(true);
  };
  const handleDragLeave = (event) => {
    setIsDragged(false);
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    if (!onFilesChange) {
      return;
    }

    let newFilesList = e.target.files;

    if (!newFilesList || newFilesList.length === 0) {
      return;
    }

    let newFiles = files;
    for (let i = 0; i < newFilesList.length; i++) {
      newFiles.push(newFilesList.item(i));
    }

    newFiles = Array.from(new Set(newFiles).values());

    onFilesChange(e, newFiles);
  };

  const handleDeleteClick = (file) => (event) => {
    if (!onFilesChange) {
      return;
    }

    if (!files.includes(file)) {
      return;
    }

    let newFiles = files.filter((f) => f !== file);

    onFilesChange(event, newFiles);
  };

  const handleImgClick = (file) => (event) => {
    if (!onSelectedFileChange) {
      return;
    }

    if (!files.includes(file)) {
      return;
    }

    if (selectedFile === file) {
      onSelectedFileChange(event, undefined);
      return;
    }

    onSelectedFileChange(event, file);
  };

  const handleSingleChange = (e) => {
    if (!onFilesChange) {
      return;
    }

    let newFile = e.target.files[0];

    if (!newFile) {
      return;
    }

    if (newFile === file) {
      return;
    }

    onFilesChange(e, newFile);
  };

  const handleSingleDeleteClick = (event) => {
    if (!onFilesChange) {
      return;
    }

    onFilesChange(event, undefined);
  };

  let isFiles = files.length > 0;

  return (
    <>
      <label htmlFor='contained-button-file'>
        <Input
          accept={accept}
          id='contained-button-file'
          multiple={multiple}
          type='file'
          onChange={multiple ? handleChange : handleSingleChange}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: 200,
            backgroundColor: lighten(
              theme.palette.primary.light,
              isDragged ? 0.8 : 0.9
            ),
            border: `1px dashed ${theme.palette.primary.light}`,
            borderRadius: 2,
            m: 2,
            '&:hover': {
              cursor: 'pointer'
            }
          }}
          {...bond}
          {...{
            onDragEnter: handleDragEnter,
            onDragLeave: handleDragLeave,
            onDragOver: handleDragOver
          }}
          draggable>
          <FaCloudUploadAlt fontSize={50} color={theme.palette.primary.main} />
          <Typography color='text.secondary' sx={{ marginTop: 1 }}>
            {label1}
          </Typography>
        </Box>
      </label>
      <Typography variant='body1' color='text.secondary' sx={{ marginLeft: 2 }}>
        {label2}
      </Typography>
      {isFiles && (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            m: 2,
            maxWidth: '750px'
          }}>
          {files.map((filep) => (
            <FileBox
              key={filep.name}
              file={filep}
              selected={selectedFile !== undefined && selectedFile === filep}
              onDeleteClick={handleDeleteClick(filep)}
              onImgClick={handleImgClick(filep)}
            />
          ))}
        </Box>
      )}
      {file !== undefined && (
        <Box sx={{ m: 2 }}>
          <FileBox
            key={file.name}
            file={file}
            onDeleteClick={handleSingleDeleteClick(file)}
          />
        </Box>
      )}
    </>
  );
};

export default UploadZone;
