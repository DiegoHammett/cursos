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
                                Aprovecha el poder del aprendizaje digital y el acompañamiento de profesores para conseguir tu primera opción.
                            </p>
                            <a className='btn3' href='/registro'>¡Comienza ahora!</a>
                            <a className='landing-hero_button-2' href='#beneficios'>Conoce más </a>
                        </div>
                    </div>
                </section>

                <section className='landing-beneficios' id='beneficios'>
                    <div className='landing-beneficios_container'>
                        <h1 className='landing_title'>
                            ¿Por qué <span className='landing_title-focus'>elegirnos</span>?
                        </h1>
                        <p className='landing-description'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                        <div className='beneficios_boxes-container'>
                            <div className='beneficios_box-1 inset'>
                                <div className='box-1_content'>
                                    <div className='box-1_icon'><i className='bx bx-cube'></i></div>
                                    <div className='box-1_text'>
                                        <h3>Beneficio #1</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                        <a href='/'>Ver más</a>
                                    </div>
                                </div>
                            </div>

                            <div className='beneficios_box-1 inset'>
                                <div className='box-1_content'>
                                    <div className='box-1_icon'>
                                        <i className='bx bx-cube'></i>
                                     </div>
                                    <div className='box-1_text'>
                                        <h3>Beneficio #2</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                        <a href='/'>Ver más</a>
                                    </div>
                                </div>
                            </div>

                            <div className='beneficios_box-1 inset'>
                                <div className='box-1_content'>
                                    <div className='box-1_icon'><i className='bx bx-cube'></i></div>
                                    <div className='box-1_text'>
                                        <h3>Beneficio #3</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                        <a href='/'>Ver más</a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>


                </section>
            </div>
        </div>
    );
}

export default Landing;