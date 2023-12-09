'use client';
import { Card, CardMedia, CardContent, Typography, styled, CardActions, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { TUser } from '@/typings';
import LanguageIcon from '@mui/icons-material/Language';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { useUserStore } from '@/store/userStore';
import { useGlobalStore } from '@/store/globalStore';
import CustomIconButton from '@/components/Atoms/CustomIconButton';

const StyledCard = styled(Card)({
  maxWidth: 345,
});
const StyledCardMedia = styled(CardMedia)({
  height: 250,
});
const StyledDescription = styled(Typography)(({ viewMore }: { viewMore: boolean }) => ({
  display: '-webkit-box',
  WebkitLineClamp: viewMore ? 'unset' : 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));
const StyledViewMoreAction = styled(Typography)({
  cursor: 'pointer',
  color: 'blue',
  textDecoration: 'underline',
});
type Props = {
  data: TUser;
};

const CustomCard = ({ data }: Props) => {
  const [viewMore, setViewMore] = useState(false);
  const { setSelectedUser, getUserById } = useUserStore();
  const { setModalInformation } = useGlobalStore();
  const handleClickGoToWebsite = () => {
    window.open(data.website, '_blank');
  };
  const handleEditIconClick = () => {
    setSelectedUser(getUserById(data.id) as TUser);
    setModalInformation({
      show: true,
      type: 'edit',
    });
  };
  const handleInfoIconClick = () => {
    const user = getUserById(data.id);
    setSelectedUser(user as TUser);
    setModalInformation({
      show: true,
      type: 'info',
    });
  };
  return (
    <StyledCard>
      <StyledCardMedia image={data.avatar} title={data.name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {data.name}
        </Typography>
        <StyledDescription variant="body2" color="textSecondary" viewMore={viewMore}>
          {data.description}
        </StyledDescription>
        <StyledViewMoreAction onClick={() => setViewMore(!viewMore)}>{viewMore ? 'View Less' : 'View More'}</StyledViewMoreAction>
      </CardContent>
      <CardActions>
        <CustomIconButton ariaLabel="website" icon={<LanguageIcon />} handleClick={() => handleClickGoToWebsite()} />
        <CustomIconButton ariaLabel="edit" icon={<EditIcon />} handleClick={() => handleEditIconClick()} />
        <CustomIconButton ariaLabel="view all" icon={<InfoIcon />} handleClick={() => handleInfoIconClick()} />
      </CardActions>
    </StyledCard>
  );
};

export default CustomCard;
