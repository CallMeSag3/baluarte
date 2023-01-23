import './header.scss'
import React from 'react'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from 'react-slick'
import First from '../../images/slider/1.jpeg'
import Second from '../../images/slider/2.jpeg'
import Third from '../../images/slider/3.jpeg'
import Fourth from '../../images/slider/4.jpeg'
import Fifth from '../../images/slider/5.jpeg'
import Sixth from '../../images/slider/6.jpeg'

export default function Header () {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: false,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
              },
              {
                  breakpoint: 1024,
                  settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                  }
              },
              {
                  breakpoint: 768,
                  settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      arrows: false
                  }
              },
              {
                  breakpoint: 480,
                  settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      arrows: false
                  }
              }
        ]
    }
    return (
        <div className="header">
            <div className="header__titles">
                    <span className="header__titles-text">
                        Blog Personal
                    </span>
                    <h2 className="header__titles-title">
                        Union Cívica Argentina
                    </h2>

                </div>
            <Slider {...settings} className="header__slider">
                <div style={{width: 100}} className="header__slider-slide">
                    <img src={First} className="header__slider-image" alt="PrimeraImg" />
                </div>
                <div style={{width: 100}} className="header__slider-slide">
                    <img src={Second} className="header__slider-image" alt="SegundaImg" />
                </div>
                <div style={{width: 100}} className="header__slider-slide">
                   <img src={Third} className="header__slider-image" alt="TerceraImg" />
                </div>
                <div style={{width: 100}} className="header__slider-slide">
                   <img src={Fourth} className="header__slider-image" alt="CuartaImg" />
                </div>
                <div style={{width: 100}} className="header__slider-slide">
                    <img src={Fifth} className="header__slider-image" alt="QuintaImg" />
                </div>
                <div style={{width: 100}} className="header__slider-slide">
                    <img src={Sixth} className="header__slider-image" alt="SextaImg" />
                </div>
            </Slider>
        </div>
    )
}