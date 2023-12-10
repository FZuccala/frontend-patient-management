'use client';
import React from 'react';
import PatientCard from '../../Molecule/Card';
import { Button, Grid } from '@mui/material';
import { useUserStore } from '@/store/userStore';
import { useGlobalStore } from '@/store/globalStore';
import Modal from '../../Organism/Modal';
import FormUser from '../../Molecule/FormUser';
import ModalActions from '../../Organism/Modal/Actions';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TUserSchema, TUser } from '@/typings';
import { emptyFormInformationObject } from '@/utils/formInformation';
import AddIcon from '@mui/icons-material/Add';
import toast, { Toaster } from 'react-hot-toast';
type Props = {};

const HomeContainer = (props: Props) => {
  const { users, setUsers, setSelectedUser } = useUserStore();
  const { modalInformation, setModalInformation } = useGlobalStore();
  const resolver = yupResolver(TUserSchema);
  const formInstance = useForm<TUser>({
    resolver,
    defaultValues: emptyFormInformationObject,
    mode: 'onChange',
  });
  const { handleSubmit } = formInstance;
  const handleCloseModal = () => {
    setModalInformation({
      show: false,
      type: 'info',
    });
  };
  const handleClickActionModal = () => {
    const { type } = modalInformation;
    if (type === 'info') {
      handleCloseModal();
      return;
    }
    handleSubmit((data) => {
      if (type === 'edit') {
        setUsers(
          users?.map((user) => {
            if (user.id === data.id) {
              return data;
            }
            return user;
          })
        );
        toast.success('User updated successfully');
      } else {
        setUsers([...(users || []), data]);
        toast.success('User created successfully');
      }
      handleCloseModal();
    })();
  };
  const handleClickAddUser = () => {
    setSelectedUser(null);
    formInstance.reset(emptyFormInformationObject);
    setModalInformation({
      show: true,
      type: 'add',
    });
    formInstance.clearErrors();
  };
  const getModalTitle = () => {
    const { type } = modalInformation;
    if (type === 'info') {
      return 'User Information';
    }
    return type === 'edit' ? 'Edit User' : 'Add User';
  };
  return (
    <>
      <Grid
        rowSpacing={4}
        spacing={2}
        container
        sx={{
          padding: '0 24px',
        }}
      >
        {users?.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <PatientCard data={user} />
          </Grid>
        ))}
      </Grid>
      <Modal
        title={getModalTitle()}
        open={modalInformation.show}
        onClose={handleCloseModal}
        content={<FormUser isEditable={modalInformation.type !== 'info'} formInstance={formInstance} />}
        actions={<ModalActions isInfo={modalInformation.type === 'info'} handleClick={handleClickActionModal} />}
      />
      <Button
        color="primary"
        variant="contained"
        onClick={handleClickAddUser}
        sx={{
          position: 'fixed',
          right: '24px',
          bottom: '24px',
          height: '56px',
          width: '56px',
          borderRadius: '50%',
        }}
      >
        <AddIcon />
      </Button>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
    </>
  );
};

export default HomeContainer;
