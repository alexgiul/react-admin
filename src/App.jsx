import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import OnboardingLayout from "layouts/onboarding";
import { ChakraProvider } from '@chakra-ui/react'

const App = () => {
  return (
    <ChakraProvider>
      <Routes>
        
        <Route path="onboarding/sign-up" element={<OnboardingLayout />} />
        <Route path="auth/*" element={<AuthLayout />} />
                
        <Route path="admin/*" element={<AdminLayout />} />
        <Route path="/" element={<Navigate to="/auth" replace />} />
      </Routes>
    </ChakraProvider>
  );
};

export default App;
