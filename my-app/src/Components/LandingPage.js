import React from 'react'
 
import HeroSection from './HeroSection';
import Collection from './Collection';
import TopOffers from './TopOffers'; 
import TrendingNow from './TrendingNow';
import DiscoverMore from './DiscoverMore';
import DecorativeAccessories from './DecorativeAccessories';
import Footer from './Footer';


const LandingPage = () => {
  return (
    <div>
    <header className="landing-header">
       
        <HeroSection/>
        <Collection/>
        <TopOffers/>
        <TrendingNow/>
        <DiscoverMore/>
        <DecorativeAccessories/>
        <Footer/>
      </header>
      </div>


  )
}
export default LandingPage;
