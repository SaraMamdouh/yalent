import { useState } from "react";
import Modal from "../../../components/Modal";
import {
  Appointment,
  useAppointmentContext,
} from "../../../providers/AppointmentProvider";
import styles from "./DoctorDetailsModal.module.css";

type DoctorDetailsModalProps = {
  data: Appointment | null;
  onHide: () => void;
};

const DoctorDetailsModal: React.FC<DoctorDetailsModalProps> = ({
  data,
  onHide,
}) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const { addAppointment } = useAppointmentContext();

  const handleConfirmApponitment = () => {
    if (!data || !selectedTimeSlot) return;
    const appointment = {
      ...data,
      timeSlot: selectedTimeSlot,
    };
    addAppointment(appointment);
    onHide();
  };

  return (
    <Modal
      isOpen={!!data}
      onClose={onHide}
      title={data ? data.name : ""}
      onSubmit={handleConfirmApponitment}
      disabled={!selectedTimeSlot}
    >
      <div className="flex flex-col items-center justify-center">
        <img
          src={data?.photo}
          alt={data?.name || "Doctor's photo"}
          className="w-32 h-32 rounded-full"
        />
        <p className="mb-5 font-bold text-xl" id="time-slots-heading">
          Available time slots
        </p>
        <div
          className="flex flex-wrap gap-2 items-stretch justify-center"
          role="group"
          aria-labelledby="time-slots-heading"
        >
          {data?.availability.map((timeSlot) => (
        <button
          key={timeSlot}
          className={styles.tags}
          onClick={() =>
            setSelectedTimeSlot(
          timeSlot === selectedTimeSlot ? null : timeSlot
            )
          }
          style={{
            backgroundColor:
          selectedTimeSlot === timeSlot ? "#4CAF50" : "#f1f1f1",
          }}
          aria-pressed={selectedTimeSlot === timeSlot}
          aria-label={`Time slot ${timeSlot}`}
        >
          {timeSlot}
        </button>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default DoctorDetailsModal;
