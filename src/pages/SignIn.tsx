import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BarChart3 } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const SignIn = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const googleButtonRef = useRef<HTMLDivElement>(null);
  
  const from = location.state?.from?.pathname || '/analyze';

  useEffect(() => {
    // Redirect to intended page or analyze page if already authenticated
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  useEffect(() => {
    // Initialize Google Sign-In button
    const initializeGoogleButton = () => {
      if (window.google && googleButtonRef.current && import.meta.env.VITE_GOOGLE_CLIENT_ID) {
        try {
          // Clear any existing content
          googleButtonRef.current.innerHTML = '';
          
          window.google.accounts.id.renderButton(
            googleButtonRef.current,
            {
              theme: 'outline',
              size: 'large',
              text: 'continue_with',
              shape: 'rectangular',
              width: '100%',
            }
          );
        } catch (error) {
          console.error('Error rendering Google button:', error);
        }
      }
    };

    if (window.google) {
      initializeGoogleButton();
    } else {
      // Wait for Google script to load
      const checkGoogle = setInterval(() => {
        if (window.google) {
          initializeGoogleButton();
          clearInterval(checkGoogle);
        }
      }, 100);

      return () => clearInterval(checkGoogle);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-8 h-8" />
            <span className="text-2xl font-bold">AvidX</span>
          </div>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">
              Sign in to your account to access competitor analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div ref={googleButtonRef} className="w-full flex justify-center" />

            <div className="text-center text-sm text-muted-foreground">
              By signing in, you agree to our{" "}
              <Link to="#" className="underline underline-offset-4 hover:text-primary">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="#" className="underline underline-offset-4 hover:text-primary">
                Privacy Policy
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Link to="/">
            <Button variant="ghost" className="text-muted-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;