import React, { useEffect } from 'react';
import { Grid, TextField } from '@mui/material';
import { useUserStore } from '@/store/userStore';
import { emptyFormInformation } from '@/utils/formInformation';
import { TUser } from '@/typings';
import { UseFormReturn, Controller } from 'react-hook-form';
type Props = {
  isEditable?: boolean;
  formInstance: UseFormReturn<TUser>;
};

const FormUser = ({ isEditable, formInstance }: Props) => {
  const { setValue, control, formState } = formInstance;
  const { selectedUser } = useUserStore();
  useEffect(() => {
    if (selectedUser) {
      Object.keys(selectedUser).forEach((key) => {
        setValue(key as keyof TUser, selectedUser[key as keyof TUser], { shouldDirty: false });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser]);
  return (
    <Grid
      container
      spacing={3}
      rowGap={2}
      sx={{
        marginTop: '12px',
      }}
    >
      {emptyFormInformation
        .filter((it) => it.shouldShow)
        .map((formInformation) => {
          return (
            <Grid item xs={12} sm={6} key={formInformation.key}>
              <Controller
                name={formInformation.key as keyof TUser}
                control={control}
                defaultValue=""
                render={(data) => {
                  const {
                    field: { onChange, value },
                  } = data;
                  return (
                    <TextField
                      helperText={formState?.errors[formInformation.key as keyof TUser]?.message || ''}
                      size="small"
                      error={Boolean(formState?.errors[formInformation.key as keyof TUser])}
                      required={formInformation.isRequired}
                      onChange={onChange}
                      value={value}
                      fullWidth
                      label={formInformation.label}
                      variant="outlined"
                      disabled={!isEditable}
                    />
                  );
                }}
              />
            </Grid>
          );
        })}
    </Grid>
  );
};

export default FormUser;
