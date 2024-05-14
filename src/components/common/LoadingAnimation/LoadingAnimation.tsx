import React, {FC} from 'react'
import './LoadingAnimation.css'
import {CircularProgress} from '@mui/material'

interface LoadingAnimationProps {
}

const LoadingAnimation: FC<LoadingAnimationProps> = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
        }}
        >
            <CircularProgress/>
        </div>
    )
}

export default LoadingAnimation
