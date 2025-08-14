import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';

interface GenericErrorDialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorDialog: React.FC<GenericErrorDialogProps> = ({
  open,
  onClose,
  title = 'An unexpected error occurred',
  message = 'Please try again or contact support if the problem persists.',
  onRetry,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {onRetry && (
          <Button onClick={onRetry} color="primary">
            Retry
          </Button>
        )}
        <Button onClick={onClose} color="secondary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
