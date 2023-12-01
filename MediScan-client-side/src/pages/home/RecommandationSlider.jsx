import React, { useEffect, useRef, useState } from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SectionTitle from '../shared/SectionTitle';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const RecommandationSlider = () => {
    const [suggestions, setSuggestions] = useState([]);
    const axiosPublic = useAxiosPublic();
    // console.log(suggestions)

    useEffect(() => {
       axiosPublic.get('suggestions').then((response) => {
            setSuggestions(response.data);
        });
    },[])


  return (
    <div className="recommandation-slider py-16 bg-gray-100">
      <SectionTitle heading="Personalized Recommendation" subHeading="Unlock personalized recommendations for a healthier you" />

      <div className='mt-10'>
        <Swiper navigation={true} modules={[Navigation]} loop={true} className="mySwiper">
        {suggestions.map((item) => (
            <div key={item._id} >
              <SwiperSlide>
                <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
                  <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              </SwiperSlide>
            </div>
          ))}
        </Swiper>
      </div>

      
    </div>
  );
};

export default RecommandationSlider;
