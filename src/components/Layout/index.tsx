import React from "react";
import Navbar from "../Navbar";
import AppointmentProvider from "src/providers/AppointmentProvider";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AppointmentProvider>
      <div
        className="min-h-screen bg-gray-100"
        style={{ padding: "20px", maxWidth: "100%" }}
      >
        <Navbar />
        {children}
      </div>
    </AppointmentProvider>
  );
};

const withLayout = (WrappedComponent: React.FC) => {
  return function (props: any) {
    return (
      <Layout>
        <WrappedComponent {...props} />
      </Layout>
    );
  };
};

export default withLayout;
