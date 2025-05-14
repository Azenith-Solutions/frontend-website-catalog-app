import React from 'react';
import { Dialog, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CustomDialog = ({ open, onClose, children, size }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth={size} fullWidth>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '8px',
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </div>
      <div>
        {children}
      </div>
    </Dialog>
  );
};

export default CustomDialog;