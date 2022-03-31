import { Fab } from '@mui/material';
import { SaveOutlined, EditOutlined } from '@mui/icons-material';
import { UserRole } from '../../types/string-types';

interface Props {
  userRole: UserRole;
    isEdit: boolean;
    setIsEdit: (param: boolean) => void;
    onSave: (param: any) => any;
}

const SaveEditButton = ({
  userRole,
  isEdit,
  setIsEdit,
  onSave,
}: Props) => (
  <div>
    {(userRole !== 'viewer')
      && (
        isEdit ? (
          <Fab
            size="small"
            color="secondary"
            sx={{
              background: 'blue',
              color: 'white',
            }}
            onClick={onSave}
          >
            <SaveOutlined />
          </Fab>
        ) : (
          <Fab
            size="small"
            color="secondary"
            sx={{
              background: 'goldenrod',
              color: 'white',
            }}
            onClick={() => setIsEdit(true)}
          >
            <EditOutlined />
          </Fab>
        )
      )}
  </div>
);

export default SaveEditButton;
