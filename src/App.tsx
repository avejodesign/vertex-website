import './App.css';
import { ReactLenis } from 'lenis/react';
import Hero from './components/layouts/Hero';
import Lines from './components/layouts/Lines';
import About from './components/layouts/About';
import Projects from './components/layouts/Projects';
import Method from './components/layouts/Method';
import Footer from './components/layouts/Footer';
import Menu from './components/layouts/Menu';

function App() {

  return (
    <ReactLenis root options={{ duration: 1.2, lerp: 0.1, smoothWheel: true }}>
      <Menu />
      <Lines />
      <Hero />
      <About />
      <Projects />
      <Method />
      <Footer />
    </ReactLenis>
  )
}

export default App;
