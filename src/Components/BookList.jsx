import React, { useState } from 'react';
import './BookList.css';
import axios from 'axios';
import Card from './Card';

function BookList() {
    const [search, setSearch] = useState("");
    const [bookData, setData] = useState([]);

    const searchBook = (evt) => {
        if (evt.key === "Enter" || evt.type === "click") {
            if (search.trim()) {
                axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyA6SaT23KNiiA6DnUfUQTvFeyAcQEkwnSU&maxResults=40`)
                    .then(res => setData(res.data.items))
                    .catch(err => console.log(err));
            }
        }
    };

    return (
        <> 
            <div className="back">
                
                <div className="header">
                
                    <video autoPlay loop muted playsInline className="bg-video">
                        <source src="https://cdn.pixabay.com/video/2022/12/03/141525-777930401_tiny.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>



                    <div className="row1">
                        <h1>A room without books is like<br /> a body without a soul.</h1>
                    </div>
                    <div className="row2">
                        <h3 className='h3'>Find Your Book Here</h3>
                        <div className="search">
                            <input
                                type="text"
                                placeholder="Enter Your Book Name"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                onKeyPress={searchBook}
                            />
                            <button onClick={searchBook}>
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                        <img src="./images/bg2.png" alt="" />
                    </div>
                </div>

                {/* Card section below the header */}
                <div className="container">
                    <Card book={bookData} />
                </div>
            </div>
        </>
    );
}

export default BookList;
