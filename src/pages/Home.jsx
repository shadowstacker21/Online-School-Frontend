import React from 'react';
import HomeMain from '../Home/HomeMain';
import Feature from '../Home/Feature';
import TopCourse from '../Home/TopCourse';
import Choose from '../Home/Choose';
import Call from '../Home/Call';

const Home = () => {
    return (
        <div>
         <HomeMain/>
         <Feature/>
         <TopCourse/>
         <Choose/>
         <Call/>
        </div>
    );
};

export default Home;