import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';
import DetailsPage from './Components/DetailPage';
import Header from './Components/Header';
import Footer from './Components/Footer';
import ErrorPage from './Components/ErrorPage';

function App() {
  return (
    <Router>
      <Header />
      <main className="container mx-auto py-8">
        <Routes>
          <Route path="/Unsplash-Gallery/" element={<HomePage />} />
          <Route path="/Unsplash-Gallery/details/:id" element={<DetailsPage />} />
          <Route path='/Unsplash-Gallery/*' element={<ErrorPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;