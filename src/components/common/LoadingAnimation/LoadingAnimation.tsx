import { CircularProgress } from '@mui/material'
import { FC } from 'react'
import './LoadingAnimation.css'

interface LoadingAnimationProps {
}

const LoadingAnimation: FC<LoadingAnimationProps> = () => {
    return (
        <div className={'flex justify-center items-center h-full w-full'}
        >
            <CircularProgress />
        </div>
    )
}

export default LoadingAnimation
