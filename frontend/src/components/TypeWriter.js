import React, { useState, useEffect, useMemo } from 'react';

const TypewriterNavbar = ({ speed = 200 }) => {
    const words = useMemo(() => ["Vericose", "Vein","Detection","System"], []);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const currentWord = words[currentWordIndex];

            if (!isDeleting && currentCharIndex < currentWord.length) {
                setCurrentCharIndex((prevIndex) => prevIndex + 1);
            } else if (!isDeleting && currentCharIndex === currentWord.length) {
                setIsDeleting(true);
            } else if (isDeleting && currentCharIndex > 0) {
                setCurrentCharIndex((prevIndex) => prevIndex - 1);
            } else if (isDeleting && currentCharIndex === 0) {
                setIsDeleting(false);
                setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
            }
        }, speed);

        return () => clearTimeout(timeout);
    }, [currentCharIndex, currentWordIndex, isDeleting, speed, words]);

    // Get the current displayed text dynamically
    const currentWord = words[currentWordIndex];
    const displayedText = isDeleting
        ? currentWord.substring(0, currentCharIndex)
        : currentWord.substring(0, currentCharIndex + 1);

    const styles = {
        navbar: {
            display: 'flex',
            justifyContent: 'center', 
            alignItems: 'center',     
            padding: '1rem',          
        },
        typewriter: {
            fontSize: '3rem',                  
        },
        cursor: {
            animation: 'blink 1s infinite', // Adjusted for faster blinking
            display: 'inline-block',  
        }
    };

    return (
        <nav style={styles.navbar}>
            <h1 className="single-typewriter" style={styles.typewriter}>
                <strong>{displayedText}</strong>
                <span style={styles.cursor}>_</span>
            </h1>
        </nav>
    );
};

export default TypewriterNavbar;
