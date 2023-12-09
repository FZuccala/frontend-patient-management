import { Dialog, DialogTitle, DialogContent, DialogActions, useTheme, useMediaQuery } from '@mui/material'
import React from 'react'
type Props = {
    open: boolean
    onClose: () => void
    title: string
    content: React.ReactNode
    actions?: React.ReactNode
}

const Modal = ({
    open,
    onClose,
    title,
    content,
    actions
}: Props) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl" fullScreen={isMobile} PaperProps={{ sx: { boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.24)' } }}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
            {content}
        </DialogContent>
        {actions && (
            <DialogActions>
                {actions}
            </DialogActions>
        )}
    </Dialog>
  )
}

export default Modal