import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { Home } from './pages/Home';
import { Characters } from './pages/Characters';
import { CharacterDetail } from './pages/CharacterDetail';
import { Whitepaper } from './pages/Whitepaper';
import { Leaderboard } from './pages/Leaderboard';
import { Waitlist } from './pages/Waitlist';
import { AlleyAscension } from './pages/AlleyAscension';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/characters/:slug" element={<CharacterDetail />} />
            <Route path="/whitepaper" element={<Whitepaper />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/waitlist" element={<Waitlist />} />
            <Route path="/alley-ascension" element={<AlleyAscension />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
