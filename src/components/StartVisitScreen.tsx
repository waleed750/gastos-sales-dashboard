import React, { useState, useEffect } from 'react';
import { MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface StartVisitScreenProps {
  onBack: () => void;
  onVisitStarted: (visitData: VisitData) => void;
}

interface VisitData {
  id: string;
  startTime: string;
  location: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  customerName?: string;
}

const StartVisitScreen: React.FC<StartVisitScreenProps> = ({ onBack, onVisitStarted }) => {
  const [isLocating, setIsLocating] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number; address?: string } | null>(null);
  const [visitStarted, setVisitStarted] = useState(false);
  const { toast } = useToast();

  const getCurrentLocation = () => {
    setIsLocating(true);
    
    if (!navigator.geolocation) {
      toast({
        title: "Location not supported",
        description: "Your device doesn't support location services",
        variant: "destructive"
      });
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        
        // Try to get address from coordinates (mock implementation)
        try {
          const address = await reverseGeocode(latitude, longitude);
          setLocation(prev => prev ? { ...prev, address } : null);
        } catch (error) {
          console.log('Reverse geocoding failed:', error);
        }
        
        setIsLocating(false);
      },
      (error) => {
        console.error('Location error:', error);
        toast({
          title: "Location access denied",
          description: "Please enable location services to start a visit",
          variant: "destructive"
        });
        setIsLocating(false);
      },
      { 
        enableHighAccuracy: true, 
        timeout: 10000, 
        maximumAge: 60000 
      }
    );
  };

  const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    // Mock reverse geocoding - in real app would use Google Maps API
    return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  };

  const handleStartVisit = () => {
    if (!location) {
      toast({
        title: "Location required",
        description: "Please get your location first",
        variant: "destructive"
      });
      return;
    }

    const visitData: VisitData = {
      id: crypto.randomUUID(),
      startTime: new Date().toISOString(),
      location: {
        latitude: location.lat,
        longitude: location.lng,
        address: location.address
      }
    };

    setVisitStarted(true);
    
    toast({
      title: "Visit started",
      description: "Location and time recorded successfully",
    });

    // Store visit data in localStorage for persistence
    const visits = JSON.parse(localStorage.getItem('visitHistory') || '[]');
    visits.push(visitData);
    localStorage.setItem('visitHistory', JSON.stringify(visits));
    localStorage.setItem('currentVisit', JSON.stringify(visitData));

    onVisitStarted(visitData);
  };

  useEffect(() => {
    // Check if there's an ongoing visit
    const currentVisit = localStorage.getItem('currentVisit');
    if (currentVisit) {
      setVisitStarted(true);
      const visitData = JSON.parse(currentVisit);
      setLocation({
        lat: visitData.location.latitude,
        lng: visitData.location.longitude,
        address: visitData.location.address
      });
    }
  }, []);

  return (
    <div className="mobile-container bg-background min-h-screen">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Button variant="ghost" size="sm" onClick={onBack}>
            ← Back
          </Button>
          <h1 className="text-lg font-semibold">Start Visit</h1>
          <div className="w-16"></div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 space-y-6">
          {visitStarted ? (
            <Card className="p-6 text-center border-success bg-success/10">
              <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Visit Active</h2>
              <p className="text-muted-foreground mb-4">
                Your visit has been started and location tracked
              </p>
              {location && (
                <div className="space-y-2 text-sm">
                  <p className="font-medium">Location: {location.address || `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`}</p>
                  <p className="text-muted-foreground">Started: {new Date(JSON.parse(localStorage.getItem('currentVisit') || '{}').startTime || new Date()).toLocaleString()}</p>
                </div>
              )}
            </Card>
          ) : (
            <>
              {/* Location Card */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold">Current Location</h2>
                </div>
                
                {location ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-success">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Location acquired</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {location.address || `${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">Location not acquired</span>
                    </div>
                    <Button 
                      onClick={getCurrentLocation} 
                      disabled={isLocating}
                      className="w-full"
                    >
                      {isLocating ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Getting Location...
                        </>
                      ) : (
                        <>
                          <MapPin className="w-4 h-4 mr-2" />
                          Get Current Location
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </Card>

              {/* Time Card */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold">Visit Time</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  Current time: {new Date().toLocaleString()}
                </p>
              </Card>

              {/* Start Visit Button */}
              <Button 
                onClick={handleStartVisit} 
                disabled={!location}
                className="w-full py-6 text-lg"
                size="lg"
              >
                Start Visit
              </Button>

              {!location && (
                <p className="text-sm text-muted-foreground text-center">
                  Please acquire your location first to start the visit
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StartVisitScreen;