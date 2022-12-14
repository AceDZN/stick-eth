import { useTheme } from "../../hooks/useThemeContext";
import { Icon } from "./Icon"


export const ThemeIcon = () => {
    const themeContext = useTheme();
    const {theme, setTheme} = themeContext;
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    return (
        <button onClick={() => setTheme(nextTheme)}>
            <Icon icon={nextTheme === 'dark' ? 'moon' : 'sun'} mode={theme} />
        </button>
    )
}