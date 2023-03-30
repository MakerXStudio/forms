import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { useCallback, useRef } from 'react';
import styles from './TextfileField.module.css';

export interface TextfileFieldProps {
  disabled?: boolean;
  placeholder?: string;
  value: string;
  onChange(value: string | Error): void;
}

export function TextfileField({
  onChange,
  disabled,
  value,
}: TextfileFieldProps) {
  const onFilesAdded = useCallback(
    async (files: File[]) => {
      if (disabled || files.length === 0) return;

      const [file] = files;
      const reader = new FileReader();
      reader.readAsText(file, 'UTF-8');

      reader.onload = function (evt) {
        onChange(evt.target?.result as string);
      };
      reader.onerror = function (e) {
        onChange(new Error('Error reading file'));
      };
    },
    [disabled, onChange]
  );

  const ref = useRef<HTMLInputElement>(null);

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1,
        }}
      >
        {!value && (
          <Button variant="contained" onClick={() => ref.current?.click()}>
            Upload
          </Button>
        )}
        <Typography>
          {value ? `${value.split('\n').length} lines` : ''}{' '}
        </Typography>
        {value && (
          <IconButton aria-label="delete" onClick={() => onChange('')}>
            <DeleteIcon />
          </IconButton>
        )}
      </Box>
      {!value && (
        <input
          ref={ref}
          className={styles['sr-only']}
          type="file"
          onChange={(e) => onFilesAdded(Array.from(e.target.files ?? []))}
          disabled={disabled}
        />
      )}
    </div>
  );
}
