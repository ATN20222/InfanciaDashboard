import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './Slider.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

const responsive = {
    superLargeDesktop: {

      breakpoint: { max: 4000, min: 3000 },
      items: 15
    },
    
    desktop: {
      breakpoint: { max: 3000, min: 1300 },
      items: 12
    },
    ipad: {
      breakpoint: { max: 1300, min: 990 },
      items: 8
    },
    tablet: {
        breakpoint: { max: 990, min: 768 },
        items: 7
      },

    mobile: {
      breakpoint: { max: 768, min: 446 },
      items: 4
    },
    smobile: {
      breakpoint: { max: 446, min: 350 },
      items: 4
    },
    ssmobile: {
        breakpoint: { max: 350, min: 328 },
        items:3
      },
    xsmobile: {
      breakpoint: { max: 328, min: 0 },
      items: 3
    }
  };

  const CustomPrevButton = ({ onClick , Class }) => (
    <button className={`Center CustomPrevBtn ${Class}`} onClick={onClick}>
        <FontAwesomeIcon icon={faCaretLeft}/>
    </button>
  );

  const CustomNextButton = ({ onClick , Class }) => (
    <button className={`Center CustomNextBtn ${Class}`} onClick={onClick}>
        <FontAwesomeIcon icon={faCaretRight}/>
    </button>
  );

function Slider({IsMeals}) {
  return (
    <section className='SecondSliderSection'>
          <div className={`Container ${IsMeals?"ClassesMeals":""}`}>
            {IsMeals?<div className="SelectAllClasses">
              <input type="checkbox" id='SelectAllClasses' />

              <label htmlFor="SelectAllClasses">

                  Select All
              </label>
            </div>:<></>
            
            }
            
            <div className="slider-container ">
                <Carousel 
                    responsive={responsive} 
                    infinite={true}  
                    customLeftArrow={<CustomPrevButton Class="WithSelectAllPrev"/>}
                    customRightArrow={<CustomNextButton Class="WithSelectAllNext" />}
                    
                >
                    <div className={`class-item ActiveClassItem ${IsMeals?"ClassItemWithSelectAll":""} `}>Class A</div>
                    <div className={`class-item ${IsMeals?"ClassItemWithSelectAll":""} `}>Class B</div>
                    <div className={`class-item ${IsMeals?"ClassItemWithSelectAll":""} `}>Class C</div>
                    <div className={`class-item ${IsMeals?"ClassItemWithSelectAll":""} `}>Class D</div>
                    <div className={`class-item ${IsMeals?"ClassItemWithSelectAll":""} `}>Class E</div>
                    <div className={`class-item ${IsMeals?"ClassItemWithSelectAll":""} `}>Class F</div>
                    <div className={`class-item ${IsMeals?"ClassItemWithSelectAll":""} `}>Class G</div>
                    <div className={`class-item ${IsMeals?"ClassItemWithSelectAll":""} `}>Class H</div>
                    <div className={`class-item ${IsMeals?"ClassItemWithSelectAll":""} `}>Class H</div>
                    <div className={`class-item ${IsMeals?"ClassItemWithSelectAll":""} `}>Class E</div>
                    <div className={`class-item ${IsMeals?"ClassItemWithSelectAll":""} `}>Class F</div>
                    <div className={`class-item ${IsMeals?"ClassItemWithSelectAll":""} `}>Class G</div>
                    <div className={`class-item ${IsMeals?"ClassItemWithSelectAll":""} `}>Class H</div>
                    <div className={`class-item ${IsMeals?"ClassItemWithSelectAll":""} `}>Class H</div>
                    <div className={`class-item ${IsMeals?"ClassItemWithSelectAll":""} `}>Class H</div>
                    <div className={`class-item ${IsMeals?"ClassItemWithSelectAll":""} `}>Class E</div>
                    <div className={`class-item ${IsMeals?"ClassItemWithSelectAll":""} `}>Class F</div>
                    <div className={`class-item ${IsMeals?"ClassItemWithSelectAll":""} `}>Class G</div>
                    <div className={`class-item ${IsMeals?"ClassItemWithSelectAll":""} `}>Class H</div>
                    <div className={`class-item ${IsMeals?"ClassItemWithSelectAll":""} `}>Class H</div>
                    <div className={`class-item ${IsMeals?"ClassItemWithSelectAll":""} `}>Class H</div>
                    <div className={`class-item ${IsMeals?"ClassItemWithSelectAll":""} `}>Class E</div>
                    <div className={`class-item ${IsMeals?"ClassItemWithSelectAll":""} `}>Class F</div>
                    <div className={`class-item ${IsMeals?"ClassItemWithSelectAll":""} `}>Class G</div>
                    <div className={`class-item ${IsMeals?"ClassItemWithSelectAll":""} `}>Class H</div>
                    <div className={`class-item ${IsMeals?"ClassItemWithSelectAll":""} `}>Class H</div>
                </Carousel>
                <div className="SliderHr"></div>
                <div className="info">
                    <span>Age From 1.6 to 22 | 1 Kids</span>
                </div>
                </div>
          </div>
        </section>
    
  );
}

export default Slider;
