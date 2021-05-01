import '../styling/App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

function App() {
  return (
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,800;1,400;1,500;1,600;1,800&display=swap" rel="stylesheet"></link>
      </head>
      <div className="App">
        <Header />
        <Main />
        <Footer />
      </div>
    </html>

  );
}

export default App;
