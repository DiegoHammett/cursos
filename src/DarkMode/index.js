import React from 'react';
import './darkmode_styles.css'


function DarkMode() {


    const setDarkMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'dark');
        localStorage.setItem("selectedTheme", "dark")
    }

    const setLightMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'light');
        localStorage.setItem("selectedTheme", "light")
    }

    const selectedTheme = localStorage.getItem("selectedTheme");

    if (selectedTheme === "dark") {
        setDarkMode();
    }

    const toggleTheme = (e) => {
        if (e.target.checked) setDarkMode();
        else setLightMode();
    }

    return (
        <div className='darkmode-body'>
            <label>
                <input
                    className="toggle-checkbox"
                    type="checkbox"
                    id='darkmode-toggle'
                    onChange={toggleTheme}
                    defaultChecked={selectedTheme === "dark"}
                />
                <div className="toggle-slot it-inset-shadow">
                    <div className="sun-icon-wrapper">
                        <div className="iconify sun-icon" data-icon="feather-sun" data-inline="false"></div>
                    </div>
                    <div className="toggle-button"></div>
                    <div className="moon-icon-wrapper">
                        <div className="iconify moon-icon" data-icon="feather-moon" data-inline="false"></div>
                    </div>
                </div>
            </label>
        </div>
    );
}

export default DarkMode;