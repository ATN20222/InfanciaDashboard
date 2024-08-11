import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './Slider.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight, faPen } from '@fortawesome/free-solid-svg-icons';
import EditClassModal from '../ManageClasses/EditClassModal';
import { ClassService } from '../../Service/Api';
import toast from 'react-hot-toast';

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

function Slider({IsMeals , Classes , HandleSelectClass ,OnEdit}) {

  const [ SelectedClass,SetSelectedClass ] = useState(null);
  useEffect(() => {
    if (Classes && Classes.length > 0) {
        SetSelectedClass(Classes[0]);
        HandleSelectClass(Classes[0]);
    }
}, [Classes]);



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
                  {Classes&&Classes.map((item)=>(

                    <div className={`class-item ${IsMeals?"ClassItemWithSelectAll":""} ${SelectedClass?.id==item.id?"ActiveClassItem":""}`} onClick={()=>{HandleSelectClass(item); SetSelectedClass(item)}}>{item.name}</div>
                  ))

                  }
                    {/* <div className={`class-item ActiveClassItem ${IsMeals?"ClassItemWithSelectAll":""} `}>Class A</div>  */}
                    
                </Carousel>
                <div className="SliderHr"></div>
                <div className="info ClassInfo">
                    <span>Age From {SelectedClass?.age_from} to {SelectedClass?.age_to} | {SelectedClass?.kids_count} Kids 
                      <span>
                        <div className='EditClassBtn' onClick={()=>OnEdit(SelectedClass)}>

                        <FontAwesomeIcon icon={faPen}/>
                        </div>  
                      </span>
                      
                      </span>
                </div>
                </div>
          </div>
        </section>
    
  );
}

export default Slider;
