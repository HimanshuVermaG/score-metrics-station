
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  let locationPath = "";
  
  try {
    const location = useLocation();
    locationPath = location.pathname;
    
    useEffect(() => {
      console.error(
        "404 Error: User attempted to access non-existent route:",
        locationPath
      );
    }, [locationPath]);
  } catch (error) {
    console.error("NotFound component used outside Router context");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 max-w-md">
        <h1 className="text-6xl font-bold text-brand-purple mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
        <p className="text-gray-500 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="bg-brand-purple hover:bg-purple-700">
          <Link to="/">Return to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
