import React from 'react';

const Landing = () => (
  <section className="landing">
    <h1 className="hero-title">Turn the music up!</h1>

    <section className="selling-points">
      <div className="point-1">
        <h2 className="point-title-1">Choose your music</h2>
        <p className="point-description-1">The world is full of music; why should you have to listen to music that someone else chose?</p>
      </div>
      <div className="point-2">
        <h2 className="point-title-2">Unlimited, streaming, ad-free</h2>
        <p className="point-description-2">No arbitrary limits. No distractions.</p>
      </div>
      <div className="point-3">
        <h2 className="point-title-3">Mobile enabled</h2>
        <p className="point-description-3">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
      </div>
    </section>
  </section>
);

export default Landing;
