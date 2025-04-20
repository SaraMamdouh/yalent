import Card from "src/components/Card";
import data from "src/assets/data.json";
import withLayout from "src/components/Layout";
import { Appointment } from "src/providers/AppointmentProvider";
import { useState } from "react";
import DoctorDetailsModal from "./components/DoctorDetailsModal";

const Home = () => {
  const [activeModal, setActiveModal] = useState<Appointment | null>(null);
  return (
    <>
      <DoctorDetailsModal
        data={activeModal}
        onHide={() => setActiveModal(null)}
      />
  
      <div className="flex flex-wrap justify-center my-40 items-stretch gap-4 px-4 sm:px-8">
        {data.map((item) => (
          <Card
        key={item.id}
        data={item}
        handleAddAppointment={(data: Appointment) => setActiveModal(data)}
          />
        ))}
      </div>
    </>
  );
};

export default withLayout(Home);
