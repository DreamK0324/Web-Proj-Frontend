

import { Link } from 'react-router-dom';



const HomePageView = () => {
  return (
    <div>
      <h6>HomePage</h6>
      <Link to={'/employees'} > All Employtees </Link>
      <Link to={'/tasks'} > All Task </Link>
      
    </div>
  );    
}




export default HomePageView;
