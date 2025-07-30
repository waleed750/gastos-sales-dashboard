import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, ArrowRight } from 'lucide-react';

interface LoginScreenProps {
  onNext: (phone: string) => void;
}

const LoginScreen = ({ onNext }: LoginScreenProps) => {
  const [countryCode, setCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = () => {
    if (phoneNumber.length >= 10) {
      onNext(countryCode + phoneNumber);
    }
  };

  const countryCodes = [
    { code: '+1', country: 'United States', flag: '🇺🇸' },
    { code: '+971', country: 'UAE', flag: '🇦🇪' },
    { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
    { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
    { code: '+91', country: 'India', flag: '🇮🇳' },
  ];

  return (
    <div className="mobile-container bg-background">
      <div className="p-6 pt-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 gradient-primary rounded-2xl mx-auto mb-6 flex items-center justify-center">
            <Phone className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Welcome Back
          </h1>
          <p className="text-muted-foreground">
            Enter your phone number to continue
          </p>
        </div>

        {/* Phone Input Form */}
        <div className="space-y-6">
          <div className="space-y-4">
            <label className="text-sm font-medium text-foreground">
              Country Code
            </label>
            <Select value={countryCode} onValueChange={setCountryCode}>
              <SelectTrigger className="input-premium">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {countryCodes.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    <div className="flex items-center space-x-2">
                      <span>{country.flag}</span>
                      <span>{country.code}</span>
                      <span className="text-muted-foreground text-sm">
                        {country.country}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-medium text-foreground">
              Phone Number
            </label>
            <Input
              type="tel"
              placeholder="123 456 7890"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="input-premium text-lg tracking-wider"
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={phoneNumber.length < 10}
            variant="premium"
            size="full"
            className="mt-8"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-xs text-muted-foreground">
            By continuing, you agree to our{' '}
            <span className="text-primary font-medium">Terms of Service</span>{' '}
            and{' '}
            <span className="text-primary font-medium">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;