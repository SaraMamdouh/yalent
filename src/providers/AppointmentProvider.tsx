import React, { createContext, useState, ReactNode, useContext } from "react";
import AppointmentsModal from "src/features/Home/components/AppointmentsModal";

export interface Appointment {
  id: number;
  name: string;
  photo: string;
  specialty: string;
  availability: string[];
  location: string;
  timeSlot?: string;
}

interface AppointmentContextType {
  appointments: Appointment[];
  addAppointment: (appointment?: Appointment) => void;
  handleShowAppointments:()=>void
}

const AppointmentContext = createContext<AppointmentContextType>({
  appointments: [],
  addAppointment: () => {},
  handleShowAppointments:()=>{}
});

export const useAppointmentContext = () => useContext(AppointmentContext);

const AppointmentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showAppointments, setShowAppointments] = useState(false);

  const addAppointment = (appointment?: Appointment) => {
    if (!appointment) return;
    setAppointments((prev) => [...prev, appointment]);
  };

  const handleShowAppointments = () => {
    setShowAppointments(true);
  }

  return (
    <AppointmentContext.Provider value={{ appointments, addAppointment,handleShowAppointments }}>
          <AppointmentsModal isOpen={showAppointments}  onHide={() => setShowAppointments(false)}
      />
      {children}
    </AppointmentContext.Provider>
  );
};

export default AppointmentProvider;
