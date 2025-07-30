import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { ArrowLeft, Shield, RotateCcw } from 'lucide-react';

interface OTPScreenProps {
  phoneNumber: string;
  onVerify: () => void;
  onBack: () => void;
}

const OTPScreen = ({ phoneNumber, onVerify, onBack }: OTPScreenProps) => {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleResend = () => {
    setTimer(60);
    setCanResend(false);
    setOtp('');
  };

  const handleVerify = () => {
    if (otp.length === 6) {
      onVerify();
    }
  };

  return (
    <div className="mobile-container bg-background">
      <div className="p-6 pt-12">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            onClick={onBack}
            variant="ghost"
            size="icon"
            className="mr-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">Verify Phone</h1>
        </div>

        {/* Icon and Title */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 gradient-primary rounded-2xl mx-auto mb-6 flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Enter Verification Code
          </h2>
          <p className="text-muted-foreground">
            We sent a 6-digit code to
          </p>
          <p className="text-foreground font-medium">
            {phoneNumber}
          </p>
        </div>

        {/* OTP Input */}
        <div className="space-y-8">
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={setOtp}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} className="w-12 h-12 text-lg" />
                <InputOTPSlot index={1} className="w-12 h-12 text-lg" />
                <InputOTPSlot index={2} className="w-12 h-12 text-lg" />
                <InputOTPSlot index={3} className="w-12 h-12 text-lg" />
                <InputOTPSlot index={4} className="w-12 h-12 text-lg" />
                <InputOTPSlot index={5} className="w-12 h-12 text-lg" />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button
            onClick={handleVerify}
            disabled={otp.length !== 6}
            variant="premium"
            size="full"
          >
            Verify & Continue
          </Button>
        </div>

        {/* Resend Section */}
        <div className="mt-8 text-center">
          {!canResend ? (
            <p className="text-muted-foreground text-sm">
              Resend code in{' '}
              <span className="font-medium text-primary">
                00:{timer.toString().padStart(2, '0')}
              </span>
            </p>
          ) : (
            <Button
              onClick={handleResend}
              variant="ghost"
              className="text-primary font-medium"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Resend Code
            </Button>
          )}
        </div>

        {/* Help Text */}
        <div className="mt-12 text-center">
          <p className="text-xs text-muted-foreground">
            Didn't receive the code?{' '}
            <span className="text-primary font-medium">Check your SMS</span>{' '}
            or try calling instead
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPScreen;