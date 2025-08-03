import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, MapPin, Save, Camera } from 'lucide-react';

interface AddCustomerFormProps {
  onBack: () => void;
  onSave: (customer: any) => void;
}

const AddCustomerForm = ({ onBack, onSave }: AddCustomerFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    location: '',
    notes: '',
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Customer name is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave({
        ...formData,
        id: Date.now().toString(),
        status: 'pending',
        lastVisit: 'Never',
        totalSales: '$0'
      });
    }
  };

  return (
    <div className="mobile-container bg-background pb-20">
      <div className="p-6 md:p-8 lg:p-12">
        {/* Header */}
        <div className="flex items-center mb-8 md:mb-12">
          <Button
            onClick={onBack}
            variant="ghost"
            size="icon"
            className="mr-2 md:mr-4 touch-friendly"
          >
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
          </Button>
          <div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground">Add Customer</h1>
            <p className="text-sm md:text-base text-muted-foreground">Create new customer profile</p>
          </div>
        </div>

        <div className="tablet-two-column">
          {/* Left Column - Form */}
          <div className="flex-1 space-y-6 md:space-y-8">
            {/* Basic Information */}
            <div className="card-premium p-4 md:p-6">
              <h3 className="font-semibold text-foreground mb-4 md:mb-6 md:text-lg">Basic Information</h3>
              
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label className="text-sm md:text-base font-medium text-foreground mb-2 block">
                    Customer Name *
                  </label>
                  <Input
                    placeholder="e.g., Al Rashid Trading Co."
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`input-premium touch-friendly ${errors.name ? 'border-destructive' : ''}`}
                  />
                  {errors.name && (
                    <p className="text-xs md:text-sm text-destructive mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm md:text-base font-medium text-foreground mb-2 block">
                    Phone Number *
                  </label>
                  <Input
                    type="tel"
                    placeholder="+971 50 123 4567"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`input-premium touch-friendly ${errors.phone ? 'border-destructive' : ''}`}
                  />
                  {errors.phone && (
                    <p className="text-xs md:text-sm text-destructive mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm md:text-base font-medium text-foreground mb-2 block">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="customer@company.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="input-premium touch-friendly"
                  />
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="card-premium p-4 md:p-6">
              <h3 className="font-semibold text-foreground mb-4 md:mb-6 md:text-lg">Location</h3>
              
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label className="text-sm md:text-base font-medium text-foreground mb-2 block">
                    Address *
                  </label>
                  <Textarea
                    placeholder="Street, City, Emirate"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className={`input-premium min-h-[80px] md:min-h-[100px] ${errors.address ? 'border-destructive' : ''}`}
                  />
                  {errors.address && (
                    <p className="text-xs md:text-sm text-destructive mt-1">{errors.address}</p>
                  )}
                </div>

                <Button
                  variant="outline"
                  className="w-full touch-friendly"
                  onClick={() => {
                    // Mock location selection
                    handleInputChange('location', '25.2048° N, 55.2708° E');
                  }}
                >
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  {formData.location ? 'Update Location' : 'Select Location on Map'}
                </Button>
                
                {formData.location && (
                  <p className="text-xs md:text-sm text-success">
                    📍 Location saved: {formData.location}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Additional Info and Actions */}
          <div className="md:w-80 lg:w-96 space-y-6 md:space-y-8">
            {/* Additional Notes */}
            <div className="card-premium p-4 md:p-6">
              <h3 className="font-semibold text-foreground mb-4 md:mb-6 md:text-lg">Additional Information</h3>
              
              <div>
                <label className="text-sm md:text-base font-medium text-foreground mb-2 block">
                  Notes
                </label>
                <Textarea
                  placeholder="Any additional notes about this customer..."
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  className="input-premium min-h-[100px] md:min-h-[120px]"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 md:space-y-4">
              <Button
                onClick={handleSave}
                className="w-full btn-primary touch-friendly"
              >
                <Save className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Save Customer
              </Button>
              
              <Button
                onClick={onBack}
                variant="outline"
                className="w-full touch-friendly"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCustomerForm;