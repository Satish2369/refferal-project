import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from './Navigation';

const Layout = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-secondary">
      <Navigation />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-card py-6 border-t border-border">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Referral Reward Program. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout; 