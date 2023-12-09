import React from 'react'
import { Box, Button } from '@mui/material'

type Props = {
    isInfo: boolean
    handleClick: () => void
}

const ModalActions = ({
    isInfo,
    handleClick
}: Props) => {
  return (
    <Box sx={{
        display: 'flex',
        justifyContent: 'flex-end',
    }}>
        <Button variant="contained" color="primary" onClick={handleClick}>
            {isInfo ? 'Close' : 'Save'}
        </Button>
    </Box>
  )
}

export default ModalActions