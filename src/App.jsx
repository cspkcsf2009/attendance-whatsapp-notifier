// src/App.js
import AttendanceTable from './components/AttendanceTable';
import './App.css'; // Ensure Tailwind CSS is imported
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <AttendanceTable />
      <Footer />
    </div>
  );
}

export default App;