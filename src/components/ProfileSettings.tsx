import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Lock, 
  LogOut, 
  Camera,
  Edit3,
  Save,
  Shield,
  Info
} from 'lucide-react';

interface ProfileSettingsProps {
  onLogout: () => void;
}

const ProfileSettings = ({ onLogout }: ProfileSettingsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Ahmed Khalil',
    email: 'ahmed.khalil@gastossales.com',
    phone: '+971 50 123 4567',
    employeeId: 'GS-2024-001',
    territory: 'Dubai & Northern Emirates',
    joinDate: 'January 2024'
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const profileSections = [
    {
      title: 'Personal Information',
      icon: User,
      items: [
        { label: 'Full Name', value: profile.name, key: 'name', editable: true },
        { label: 'Email', value: profile.email, key: 'email', editable: true },
        { label: 'Phone', value: profile.phone, key: 'phone', editable: true },
      ]
    },
    {
      title: 'Work Information',
      icon: Shield,
      items: [
        { label: 'Employee ID', value: profile.employeeId, key: 'employeeId', editable: false },
        { label: 'Territory', value: profile.territory, key: 'territory', editable: false },
        { label: 'Join Date', value: profile.joinDate, key: 'joinDate', editable: false },
      ]
    }
  ];

  const actionItems = [
    {
      title: 'Change Password',
      subtitle: 'Update your account password',
      icon: Lock,
      action: () => console.log('Change password'),
      color: 'text-primary'
    },
    {
      title: 'App Information',
      subtitle: 'Version 1.2.0 - Build 245',
      icon: Info,
      action: () => console.log('App info'),
      color: 'text-muted-foreground'
    },
    {
      title: 'Sign Out',
      subtitle: 'Sign out of your account',
      icon: LogOut,
      action: onLogout,
      color: 'text-destructive'
    }
  ];

  return (
    <div className="mobile-container bg-background pb-20">
      <div className="p-6 md:p-8 lg:p-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">Profile</h1>
            <p className="text-muted-foreground md:text-lg">Manage your account settings</p>
          </div>
          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              variant="outline"
              className="touch-friendly"
            >
              <Edit3 className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline ml-2">Edit</span>
            </Button>
          ) : (
            <div className="flex space-x-2 md:space-x-3">
              <Button
                onClick={handleCancel}
                variant="outline"
                className="touch-friendly"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="btn-primary touch-friendly"
              >
                <Save className="w-4 h-4 md:w-5 md:h-5 mr-1" />
                Save
              </Button>
            </div>
          )}
        </div>

        <div className="tablet-two-column">
          {/* Left Column - Profile Info */}
          <div className="flex-1 space-y-6 md:space-y-8">
            {/* Profile Picture */}
            <div className="card-premium p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
                <div className="relative mx-auto sm:mx-0">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 md:w-12 md:h-12 text-primary" />
                  </div>
                  {isEditing && (
                    <button className="absolute -bottom-1 -right-1 w-8 h-8 md:w-10 md:h-10 bg-primary rounded-full flex items-center justify-center shadow-lg touch-friendly">
                      <Camera className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </button>
                  )}
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                    {profile.name}
                  </h3>
                  <p className="text-muted-foreground md:text-lg">Sales Representative</p>
                  <p className="text-sm md:text-base text-primary font-medium">
                    {profile.employeeId}
                  </p>
                </div>
              </div>
            </div>

            {/* Profile Sections */}
            {profileSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="card-premium p-4 md:p-6">
                <div className="flex items-center space-x-2 mb-4 md:mb-6">
                  <section.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  <h3 className="font-semibold text-foreground md:text-lg">{section.title}</h3>
                </div>
                
                <div className="space-y-4 md:space-y-6">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <label className="text-sm md:text-base font-medium text-foreground mb-2 block">
                        {item.label}
                      </label>
                      {isEditing && item.editable ? (
                        <Input
                          value={editedProfile[item.key as keyof typeof editedProfile]}
                          onChange={(e) => 
                            setEditedProfile(prev => ({ 
                              ...prev, 
                              [item.key]: e.target.value 
                            }))
                          }
                          className="input-premium touch-friendly"
                        />
                      ) : (
                        <p className="text-muted-foreground bg-muted/50 px-3 py-2 md:px-4 md:py-3 rounded-lg md:text-lg">
                          {item.value}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Action Items */}
          <div className="md:w-80 lg:w-96">
            <div className="card-premium p-4 md:p-6">
              <h3 className="font-semibold text-foreground mb-4 md:mb-6 md:text-lg">Quick Actions</h3>
              <div className="space-y-3 md:space-y-4">
                {actionItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={item.action}
                    className="w-full card-premium p-4 md:p-5 text-left hover:shadow-md transition-all duration-300 touch-friendly"
                  >
                    <div className="flex items-center space-x-3 md:space-x-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-muted rounded-lg flex items-center justify-center">
                        <item.icon className={`w-5 h-5 md:w-6 md:h-6 ${item.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium md:text-lg ${item.color}`}>
                          {item.title}
                        </p>
                        <p className="text-sm md:text-base text-muted-foreground">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;