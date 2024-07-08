import { useSelector } from "react-redux"
import { selectIsDarkMode } from "../slices/darkModeSlice"
import { useEffect } from "react"

const DarkMode = () => {
    const isDarkMode = useSelector(selectIsDarkMode)

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode')
        } else {
            document.body.classList.remove('dark-mode')
        }
    }, [isDarkMode])

    return (
        null
    )
}

export default DarkMode