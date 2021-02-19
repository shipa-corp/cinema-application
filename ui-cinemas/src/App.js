import "./App.css";

import { useState } from "react";

import { Movies } from "./components/Movies";
import { Cinemas } from "./components/Cinemas";
import { Booking } from "./components/Booking";

function App() {
  const [selectedMovie, setSelectedMovie] = useState(undefined);

  return (
    <div className="App">
      <header className="App-header">
        <h1>UI Cinema</h1>
        <h4>Your own movie theater booking platform</h4>
      </header>

      <section className="main-content">
        <main>
          <Movies />
          <Cinemas onMovieSelect={setSelectedMovie} />
        </main>
        <aside>
          <Booking
            movie={selectedMovie}
            onComplete={() => setSelectedMovie(undefined)}
          />
        </aside>
      </section>
    </div>
  );
}

export default App;
