import { useEffect, useState } from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SectionTitle from '../shared/SectionTitle';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const RecommandationSlider = () => {
    const [suggestions, setSuggestions] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
       axiosPublic.get('/suggestions').then((response) => {
            setSuggestions(response.data);
        });
    }, [axiosPublic])


  return (
    <section className="mediscan-shell py-8 sm:py-14">
      <div className="rounded-[2rem] border border-base-300 bg-base-100 px-5 py-10 text-base-content shadow-2xl shadow-slate-950/10 sm:px-8 lg:px-10">
        <SectionTitle heading="Personalized Recommendation" subHeading="Unlock personalized recommendations for a healthier you" />

        <div className='mt-10'>
          <Swiper
            navigation={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4200, disableOnInteraction: false }}
            modules={[Navigation, Pagination, Autoplay]}
            loop={true}
            spaceBetween={24}
            slidesPerView={1}
            className="mySwiper"
          >
            {suggestions.map((item) => (
              <SwiperSlide key={item._id}>
                <div className="mx-auto max-w-2xl overflow-hidden rounded-[1.75rem] border border-base-300 bg-base-200 shadow-xl backdrop-blur-xl">
                  <img src={item.image} alt={item.title} className="h-64 w-full object-cover" loading="lazy" />
                  <div className="space-y-4 p-6 text-left sm:p-8">
                    <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                      Suggested reading
                    </span>
                    <h3 className="text-2xl font-black tracking-tight text-base-content">{item.title}</h3>
                    <p className="text-sm leading-7 text-base-content/75">{item.description}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default RecommandationSlider;
