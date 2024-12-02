import React from 'react';
import { Link } from 'react-router-dom';

const InfoCard = ({ IconComponent, iconColor, title, count, path }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center flex-col space-y-3">
      <div className={`text-3xl mr-4 ${iconColor}`}>
        <IconComponent/>
      </div>
      <div className='flex  flex-col items-center space-y-3'>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-lg font-semibold">{count}</p>
      </div>
      { path && (
        <div>
          <Link to={path} className='text-blue-300 underline hover:text-blue-500'>{path}</Link>
        </div>

      )}
    </div>
  );
};

export default InfoCard;
