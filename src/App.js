import './App.css';
import Shell from './components/shell'
import defaultTheme from './theme/custom-theme';
import { ThemeProvider } from '@mui/material';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="App" style={{height: '100%'}}>
          <Shell />
      </div>
    </ThemeProvider>
  );
}

export default App;
