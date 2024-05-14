// Dark mode theme
import React, {ReactNode} from 'react'
import {
    createTheme,
    CssBaseline,
    Theme,
    ThemeProvider,
} from '@mui/material'


const darkTheme: Theme = createTheme({
    palette: {
        mode: 'dark',
    },
})

interface DarkThemeComponentProps {
    children: ReactNode
}

const DarkThemeComponent = ({children}: DarkThemeComponentProps) => {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            {children}
        </ThemeProvider>
    )
}

export default DarkThemeComponent