import logo from './logo.svg';
import './App.css';
import Shell from './components/shell'
import defaultTheme from './theme/custom-theme';
import { ThemeProvider } from '@mui/material';

function App() {
  console.log('defaultTheme', defaultTheme);
  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="App">
          <Shell />
      </div>
    </ThemeProvider>
  );
}

export default App;
