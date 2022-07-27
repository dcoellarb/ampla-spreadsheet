import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import Spreadsheet from './Spreadsheet';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Spreadsheet />}>
          <Route path="spreadsheets" element={<Spreadsheet />}>
            <Route path=":spreadsheetId" element={<Spreadsheet />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
