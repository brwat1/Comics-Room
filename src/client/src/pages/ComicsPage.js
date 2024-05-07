import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ComicCard from '../components/ComicCard';
import '../style/components/comicsPage.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ComicsPage = () => {
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate(); //@TODO: rajouter un orderby dans l'API sur l'id quand je query
    const slickSettings = {
        centerMode: true,
        centerPadding: '260px',
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/api/comic/title/${encodeURIComponent(searchInput)}`);
                setSearchResults(res.data);
            } catch (error) {
                console.error('Erreur lors de la recherche :', error);
            }
        };

        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                fetchData();
            }
        };
        const searchInputElement = document.getElementById('searchInput');

        if (searchInputElement) {
            searchInputElement.addEventListener('keydown', handleKeyDown);

            return () => {
                searchInputElement.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [searchInput, searchResults]);

    return (
        <div className={'comics-container'}>
            <div className="textbox">
                <div className="textbox-box">
                    <div className="textbox-face textbox-side"></div>
                    <div className="textbox-face textbox-bottom"></div>
                    <div className="textbox-face textbox-top"></div>
                    <div className="textbox-field">
                        <div className="textbox-label">Comics</div>
                        <input className="textbox-text"
                               type="text"
                               id="searchInput"
                               placeholder="Rechercher..."
                               value={searchInput}
                               onChange={(e) => setSearchInput(e.target.value)}/>
                    </div>
                    <div className="textbox-action">
                        <div className="textbox-face textbox-side"></div>
                        <div className="textbox-face textbox-top"></div>
                        <div className="textbox-face textbox-bottom"></div>
                        <svg viewBox="0 0 24 24">
                            <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
                        </svg>
                    </div>
                </div>
            </div>
            <div id="searchResults">
                <Slider {...slickSettings}>
                    {searchResults.map((result) => (
                        <ComicCard comic={result}></ComicCard>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default ComicsPage;