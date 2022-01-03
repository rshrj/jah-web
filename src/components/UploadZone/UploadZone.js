import { useTheme } from '@emotion/react';
import { Button, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { styled, lighten } from '@mui/material/styles';
import { FaCloudUploadAlt, FaTimes } from 'react-icons/fa';
import { useEffect, useState } from 'react';

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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: lighten(theme.palette.grey[50], 0.5),
        outline: selected
          ? `2px solid ${theme.palette.primary.main}`
          : `1px solid ${theme.palette.grey[300]}`,
        borderRadius: 5,
        p: 2,
        '&:hover': { cursor: 'pointer' }
      }}>
      <Button
        variant='text'
        color='error'
        startIcon={<FaTimes />}
        sx={{ marginBottom: 1 }}
        onClick={onDeleteClick}>
        Remove
      </Button>
      {/^image\/[a-zA-Z]+$/i.test(file.type) && (
        <img
          src={preview}
          alt='blah'
          height='80'
          style={{
            borderRadius: 5,
            overflow: 'hidden',
            marginBottom: 5
          }}
          onClick={onImgClick}
        />
      )}
      <Typography>{file.name}</Typography>
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
            backgroundColor: lighten(theme.palette.primary.light, 0.9),
            border: `1px dashed ${theme.palette.primary.light}`,
            borderRadius: 10,
            m: 2,
            '&:hover': {
              cursor: 'pointer'
            }
          }}>
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
        <Stack direction='row' spacing={2} sx={{ flexWrap: 'wrap', m: 2 }}>
          {files.map((filep) => (
            <FileBox
              key={filep.name}
              file={filep}
              selected={selectedFile !== undefined && selectedFile === filep}
              onDeleteClick={handleDeleteClick(filep)}
              onImgClick={handleImgClick(filep)}
            />
          ))}
        </Stack>
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
