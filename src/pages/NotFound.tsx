import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ButtonColorful } from "@/components/ui/button-colorful";
import { Layout } from "@/components/ui/layout";

const NotFound: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="flex h-[70vh] flex-col items-center justify-center">
        <h1 className="mb-2 text-4xl font-bold">404</h1>
        <p className="mb-6 text-xl text-muted-foreground">Page Not Found</p>
        <ButtonColorful label="Go Home" onClick={() => window.location.href = "/"} />
      </div>
    </Layout>
  );
};

export default NotFound;
