const DetailCard = ({ title, value, icon }) => {
    return (
      <div className="bg-gray-900 p-4 rounded-lg flex items-start">
        <span className="text-xl mr-3">{icon}</span>
        <div>
          <h4 className="text-sm font-medium text-gray-400">{title}</h4>
          <p className="text-lg font-bold">{value}</p>
        </div>
      </div>
    );
  };
  
  export default DetailCard;