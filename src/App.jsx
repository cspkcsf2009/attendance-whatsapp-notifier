// src/App.js
import Dashboard from './components/Dashboard';
import './App.css'; // Ensure Tailwind CSS is imported
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Dashboard />
      <Footer />
    </div>
  );
}

export default App;