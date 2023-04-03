import React from 'react';
import Navbar from '../Navbar';
import './landing_styles.css'

function Landing() {
    return (
        <div className="App">
            <div className='landing-body'>
                <section className='landing-header'>
                    <Navbar />
                    <div className='landing-hero'>
                        <div className='landing-hero_textbox'>
                            <h1 className='landing-hero_title'>Aprende, estudia y asegura tu futuro</h1>
                            <p className='landing-hero_description'>
                                Aprovecha el poder de las plataformas y el aprendizaje digital para conseguir tu primera opción.
                            </p>
                            <a className='landing-hero_button' href='/'>¡Comienza ahora!</a>
                            <a className='landing-hero_button-2' href='/'>Conoce más </a>
                        </div>
                    </div>
                </section>

                <section className='landing-section2'>
                    a
                </section>
            </div>
        </div>
    );
}

export default Landing;