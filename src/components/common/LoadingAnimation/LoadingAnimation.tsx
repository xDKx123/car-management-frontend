import { Box, CircularProgress } from '@mui/material'
import { FC } from 'react'
import './LoadingAnimation.css'

interface LoadingAnimationProps {
}

const LoadingAnimation: FC<LoadingAnimationProps> = () => {
    return (
        <Box className={'flex justify-center items-center h-screen w-screen'}
        >
            <CircularProgress />
        </Box>
    )
}

export default LoadingAnimation
