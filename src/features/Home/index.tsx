import Card from "../../components/Card";
import data from "../../assets/data.json";
import withLayout from "../../components/Layout";
import { Appointment } from "../../providers/AppointmentProvider";
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
      <div className="flex flex-wrap  justify-center my-40 items-stretch">
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
