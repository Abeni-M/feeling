import React, { useState, useEffect } from 'react';
import './AboutMe.css';

import profilePic from '../assets/profile.jpg';

// Automatically import all images from the assets folder, EXCLUDING the profile picture
const imageModules = import.meta.glob('../assets/*.{png,jpg,jpeg,webp}', { eager: true });
const images = Object.keys(imageModules)
  .filter((path) => !path.includes('profile.jpg'))
  .map((path) => imageModules[path].default);

const AboutMe = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="about-container">
      <div className="about-content">

        {/* Greeting Section */}
        <section className="greeting-section">
          <div className="profile-container">
            <img src={profilePic} alt="Abenezer Mulatu" className="profile-pic" />
            <span className="profile-badge" title="Available"></span>
          </div>
          <h1 className="greeting-title">Hey there! I'm Abenezer Mulatu</h1>
          <p className="greeting-text">
            I believe in greeting everyone with a warm smile and a genuine connection.
            I'm a <span className="greeting-highlight">young guy</span> with a passionate background in tech, and I'm just a cool, easy-going person who
            loves making people feel at home. Whether we're talking about code, life, or everything
            in between, I always bring positive energy and an open heart to every conversation.
          </p>
        </section>

        {/* The Special Person/Feeling Section */}
        {!isRevealed ? (
          <div className="reveal-container">
            <button 
              className={`reveal-button ${isRevealing ? 'heartbeat-active' : ''}`} 
              onClick={() => {
                setIsRevealing(true);
                setTimeout(() => {
                  setIsRevealing(false);
                  setIsRevealed(true);
                }, 2500); // 2.5 seconds suspense
              }}
              disabled={isRevealing}
            >
              <span className="button-text">{isRevealing ? "Unlocking My Heart..." : "A Special Message For You"}</span>
              <span className="button-icon">{isRevealing ? "💖" : "💌"}</span>
            </button>
          </div>
        ) : (
          <section className="special-section fade-in-sweeping">
          <div className="image-container">
            {images.map((imgSrc, index) => (
              <img
                key={index}
                src={imgSrc}
                alt={`Special connection ${index + 2}`}
                className={`special-image slider-image ${index === currentImageIndex ? 'active' : ''}`}
              />
            ))}
          </div>
          <div className="feeling-text">
            "My Dearest yene fkr,

            I've been trying to write this for a while, because I love you never feels like enough.
            Those three words are true, but they are just the door.
            What I feel for you is the whole house,
            and the garden, and the sky above it.

            Before you, I was Abenezer. But with you,
            I feel like I am finally meeting the person I was always meant to be.
            You don't just add to my life; you have fundamentally changed its texture and its light.
            You've made the ordinary world feel like a sacred place.

            I love the way your mind works, the way you see details I miss.
            I love your strength, the quiet way you handle things that would break others.
            And yes, I love your smile, the one that starts in your eyes before it reaches your lips.
            I love the sound of your voice, especially when you’re tired and it gets soft and low.

            Loving you isn't a feeling that comes and goes.
            It's a gravity. It's the constant, steady pull of
            my entire being toward yours. You are my home, not a place, but a person.

            Whatever the future holds, the one thing I know for certain is that
            I want to be next to you for all of it. Thank you for being the best
            part of every single one of my days.

            With all my heart,"
            <span className="amharic-text">
              የኔ ውድ  ኢወድሻለው አፈቅርሻለው በቃ💖🌹
            </span>
          </div>
        </section>
        )}

        {/* Social Media Section */}
        <section className="social-section">
          <h3 className="social-title">Let's Connect</h3>
          <div className="social-links">
            {/* Telegram Icon */}
            <a href="https://t.me/Abe_m_1" target="_blank" rel="noreferrer" className="social-btn" aria-label="Telegram">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </a>

            {/* Instagram Icon */}
            <a href="https://www.instagram.com/abe_ne_zer_m?igsh=MWhxc2JqcGJpZTN0ag==" target="_blank" rel="noreferrer" className="social-btn" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            {/* Facebook Icon */}
            <a href="https://www.facebook.com/abenezer.mulatu.37" target="_blank" rel="noreferrer" className="social-btn" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>

            {/* TikTok Icon */}
            <a href="https://www.tiktok.com/@benenzer70?_t=8M6qg04WnL2&_r=1" target="_blank" rel="noreferrer" className="social-btn" aria-label="TikTok">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.22-1.15 4.39-2.9 5.84-1.76 1.48-4.2 2.1-6.44 1.71-2.22-.38-4.25-1.57-5.55-3.37-1.31-1.83-1.66-4.22-1.07-6.39.6-2.18 2.25-3.95 4.35-4.8 2.05-.82 4.35-.87 6.42-.14v4.03c-1.12-.47-2.39-.46-3.48-.06-1.07.41-1.92 1.25-2.29 2.3-.39 1.09-.16 2.37.58 3.27.75.92 2.01 1.34 3.16 1.11 1.14-.23 2.12-1.01 2.53-2.09.43-1.13.34-2.42.34-3.64V.02z" />
              </svg>
            </a>

            {/* Twitter/X Icon */}
            <a href="https://twitter.com/AbenezerMulatu" target="_blank" rel="noreferrer" className="social-btn" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
};

export default AboutMe;


