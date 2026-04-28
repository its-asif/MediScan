import { useContext } from 'react';
import { ThemeContext } from '../provider/ThemeProvider';

const useTheme = () => useContext(ThemeContext);

export default useTheme;
