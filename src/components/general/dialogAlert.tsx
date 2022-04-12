import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';

interface Props {
    header: string;
    content: string;
    isOpen: boolean;
    setIsOpen: (param: boolean) => void;
    activateResponse?: (param: any) => any;
    param?: any;
}

const DialogAlert = ({
  header,
  content,
  isOpen,
  setIsOpen,
  activateResponse,
  param,
}: Props) => (
  <Dialog
    open={isOpen}
    onClose={() => setIsOpen(false)}
  >
    <DialogTitle dir="rtl">
      {header}
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        {content}
      </DialogContentText>
    </DialogContent>
    <DialogActions sx={{ display: 'flex', justifyContent: 'start' }}>
      <Button
        color="error"
        variant="contained"
        onClick={() => {
          setIsOpen(false);
          if (activateResponse && param) activateResponse(param);
        }}
        autoFocus
      >
        הבנתי
      </Button>
    </DialogActions>
  </Dialog>
);

export default DialogAlert;

DialogAlert.defaultProps = {
  activateResponse: undefined,
  param: undefined,
};
