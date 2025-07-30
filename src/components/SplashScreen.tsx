import { useEffect, useState } from 'react';
import gastos_logo from '@/assets/gastos-logo.png';

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 300);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`mobile-container gradient-hero flex items-center justify-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="text-center fade-in">
        <div className="mb-8">
          <img 
            src={gastos_logo} 
            alt="Gastos Sales Logo" 
            className="w-24 h-24 mx-auto mb-6 rounded-2xl shadow-lg"
          />
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-2">
          Gastos Sales
        </h1>
        
        <p className="text-white/80 text-lg font-medium">
          Field Sales Management
        </p>
        
        <div className="mt-12">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-8 gap-4 h-full w-full p-8">
          {Array.from({ length: 64 }).map((_, i) => (
            <div 
              key={i} 
              className="border border-white/20 rounded-lg"
              style={{ animationDelay: `${i * 0.1}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;