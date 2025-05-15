const ComparisonCard = ({ title, time, emails, active, improvement }) => {
    const colors = {
      Linear: active ? 'bg-purple-600' : 'bg-gray-700',
      Parallel: active ? 'bg-blue-600' : 'bg-gray-700',
      Distributed: active ? 'bg-green-600' : 'bg-gray-700'
    };
  
    return (
      <div className={`${colors[title]} p-6 rounded-lg transition-all ${active ? 'scale-105 shadow-lg' : ''}`}>
        <h4 className="text-lg font-bold mb-2">{title}</h4>
        <div className="space-y-2">
          <p className="text-sm">Time: <span className="font-medium">{time?.toFixed(2)}s</span></p>
          <p className="text-sm">Emails: <span className="font-medium">{emails}</span></p>
          {improvement && (
            <p className="text-sm mt-3 px-2 py-1 bg-black bg-opacity-30 rounded inline-block">
              {improvement}% faster than Linear
            </p>
          )}
        </div>
      </div>
    );
  };
  
  export default ComparisonCard;