import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { User, MapPin, School, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StudentData {
  firstName: string;
  lastName: string;
  grade: string;
  city: string;
  region: string;
  school: string;
  hasConsent: boolean;
}

interface StudentOnboardingProps {
  onComplete: (data: StudentData) => void;
}

const grades = [
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
];

const ethiopianRegions = [
  'Addis Ababa',
  'Oromia',
  'Amhara',
  'SNNPR',
  'Tigray',
  'Somali',
  'Afar',
  'Benishangul-Gumuz',
  'Gambela',
  'Harari',
  'Dire Dawa'
];

export const StudentOnboarding: React.FC<StudentOnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<StudentData>({
    firstName: '',
    lastName: '',
    grade: '',
    city: '',
    region: '',
    school: '',
    hasConsent: false,
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    onComplete(formData);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName;
      case 2:
        return formData.grade;
      case 3:
        return formData.city && formData.region && formData.school;
      case 4:
        return formData.hasConsent;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <User className="w-16 h-16 mx-auto mb-4 text-primary animate-bounce-gentle" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Welcome to Aku Education!</h2>
              <p className="text-muted-foreground">Let's get to know you better</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="Enter your first name"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Enter your last name"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <School className="w-16 h-16 mx-auto mb-4 text-accent animate-bounce-gentle" />
              <h2 className="text-2xl font-bold text-foreground mb-2">What grade are you in?</h2>
              <p className="text-muted-foreground">This helps us customize your learning experience</p>
            </div>
            <div>
              <Label htmlFor="grade">Grade Level</Label>
              <Select
                value={formData.grade}
                onValueChange={(value) => setFormData({ ...formData, grade: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select your grade" />
                </SelectTrigger>
                <SelectContent>
                  {grades.map((grade) => (
                    <SelectItem key={grade} value={grade}>
                      Grade {grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <MapPin className="w-16 h-16 mx-auto mb-4 text-secondary animate-bounce-gentle" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Where are you located?</h2>
              <p className="text-muted-foreground">This helps us provide region-specific content</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="region">Region</Label>
                <Select
                  value={formData.region}
                  onValueChange={(value) => setFormData({ ...formData, region: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select your region" />
                  </SelectTrigger>
                  <SelectContent>
                    {ethiopianRegions.map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Enter your city"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="school">School Name</Label>
                <Input
                  id="school"
                  value={formData.school}
                  onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                  placeholder="Enter your school name"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-success animate-bounce-gentle" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Privacy & Consent</h2>
              <p className="text-muted-foreground">We need your consent to provide personalized learning</p>
            </div>
            <div className="bg-muted/50 p-6 rounded-lg space-y-4">
              <h3 className="font-semibold text-foreground">What we collect:</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Your learning progress and quiz results</li>
                <li>• Time spent on lessons and activities</li>
                <li>• Questions you ask our AI tutor</li>
                <li>• Your academic performance data</li>
              </ul>
              <h3 className="font-semibold text-foreground">How we use it:</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Personalize your learning experience</li>
                <li>• Track your progress and achievements</li>
                <li>• Improve our educational content</li>
                <li>• Provide better tutoring recommendations</li>
              </ul>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="consent"
                checked={formData.hasConsent}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, hasConsent: checked as boolean })
                }
              />
              <Label htmlFor="consent" className="text-sm leading-relaxed">
                I consent to the collection and use of my learning data as described above. 
                I understand I can withdraw this consent at any time.
              </Label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-soft-surface flex items-center justify-center p-4">
      <Card className="w-full max-w-lg card-elevated animate-scale-in">
        <CardHeader className="text-center">
          <div className="mb-4">
            <Progress value={progress} className="w-full progress-bar" />
          </div>
          <CardTitle className="text-sm text-muted-foreground">
            Step {currentStep} of {totalSteps}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {renderStep()}
          
          <div className="flex justify-between gap-4">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="flex-1"
            >
              Previous
            </Button>
            
            {currentStep === totalSteps ? (
              <Button
                onClick={handleComplete}
                disabled={!isStepValid()}
                className={cn(
                  "flex-1 button-primary",
                  isStepValid() && "animate-glow-pulse"
                )}
              >
                Complete Setup
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!isStepValid()}
                className={cn(
                  "flex-1 button-accent",
                  isStepValid() && "hover-glow"
                )}
              >
                Next
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};