import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus, Gift } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const SignupForm = () => {
  const [searchParams] = useSearchParams();
  const referralCode = searchParams.get('ref');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referral, setReferral] = useState(referralCode || '');
  const [isLoading, setIsLoading] = useState(false);
  const [showReferralBonus, setShowReferralBonus] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Show referral bonus alert if there's a referral code in the URL
    if (referralCode) {
      setShowReferralBonus(true);
    }
  }, [referralCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await signup(email, name, password, referral || undefined);
      if (success) {
        navigate('/dashboard');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-b from-background to-secondary/50">
      <Card className="w-full max-w-md mx-auto shadow-xl bg-card border-primary/10 backdrop-blur-sm">
        <CardHeader className="space-y-1 pb-6">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <UserPlus size={32} className="text-primary" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-center">Create account</CardTitle>
          <CardDescription className="text-center text-base">
            Enter your information to get started
          </CardDescription>
        </CardHeader>
        {showReferralBonus && (
          <div className="px-6 pb-4">
            <Alert className="bg-primary/10 border-primary/20">
              <Gift className="h-5 w-5 text-primary" />
              <AlertDescription className="text-base ml-2">
                You've been referred! Sign up to receive 5 bonus points.
              </AlertDescription>
            </Alert>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-11 bg-secondary/50 border-primary/20 focus:border-primary transition-colors"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 bg-secondary/50 border-primary/20 focus:border-primary transition-colors"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a secure password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11 bg-secondary/50 border-primary/20 focus:border-primary transition-colors"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="referral" className="text-sm font-medium">Referral Code (Optional)</Label>
              <Input
                id="referral"
                type="text"
                placeholder="Enter referral code"
                value={referral}
                onChange={(e) => setReferral(e.target.value)}
                className="h-11 bg-secondary/50 border-primary/20 focus:border-primary transition-colors"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 pt-4">
            <Button 
              type="submit" 
              className="w-full h-11 text-base font-medium transition-transform hover:scale-[1.02] active:scale-[0.98]" 
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignupForm; 