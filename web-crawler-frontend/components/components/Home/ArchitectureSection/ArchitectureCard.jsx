const ArchitectureCard = ({ title, items, color }) => {
    return (
      <div className={`bg-gray-900 p-6 rounded-xl border-l-4 ${color}`}>
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <ul className="space-y-3 text-gray-300">
          {items.map((item, index) => (
            <li key={index} className="flex items-start">
              <svg className="h-5 w-5 text-purple-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default ArchitectureCard;