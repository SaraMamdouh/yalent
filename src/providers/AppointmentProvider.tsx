import React, { createContext, useState, ReactNode, useContext } from "react";

export interface Appointment {
  id: number;
  name: string;
  photo: string;
  specialty: string;
  availability: string[];
  location: string;
}

interface AppointmentContextType {
  appointments: Appointment[];
  addAppointment: (appointment?: Appointment) => void;
}

const AppointmentContext = createContext<AppointmentContextType>({
  appointments: [],
  addAppointment: () => {},
});

export const useAppointmentContext = () => useContext(AppointmentContext);

const AppointmentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const addAppointment = (appointment?: Appointment) => {
    if (!appointment) return;
    setAppointments((prev) => [...prev, appointment]);
  };

  return (
    <AppointmentContext.Provider value={{ appointments, addAppointment }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export default AppointmentProvider;
