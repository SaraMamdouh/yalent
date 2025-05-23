import Modal from "src/components/Modal";
import {
    useAppointmentContext,
} from "src/providers/AppointmentProvider";

type AppointmentsModalProps = {
    isOpen: boolean;
    onHide: () => void;
};

const AppointmentsModal: React.FC<AppointmentsModalProps> = ({
    isOpen,
    onHide,
}) => {
    const { appointments } = useAppointmentContext();

    return (
        <Modal
            isOpen={isOpen}
            onClose={onHide}
            title="Booked Appointments"
            aria-labelledby="appointments-modal-title"
        >
            <table
                className="table-auto md:table-fixed w-full text-left border-collapse border border-gray-300"
                aria-label="List of booked appointments"
            >
                <caption className="sr-only">Details of booked appointments</caption>
                <thead className="bg-gray-200 text-gray-700 uppercase text-sm font-bold text-center">
                    <tr>
                        <th scope="col" className="border border-gray-300 p-5">Doctor</th>
                        <th scope="col" className="border border-gray-300 p-5">Time Slot</th>
                        <th scope="col" className="border border-gray-300 p-5">Specialty</th>
                        <th scope="col" className="border border-gray-300 p-5">Location</th>
                    </tr>
                </thead>
                <tbody className="border-t border-gray-300 overflow-y-auto text-center">
                    {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td className="border border-gray-300 p-5">{appointment.name}</td>
                            <td className="border border-gray-300 p-5">{appointment.timeSlot}</td>
                            <td className="border border-gray-300 p-5">{appointment.specialty}</td>
                            <td className="border border-gray-300 p-5">{appointment.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Modal>
    );
};

export default AppointmentsModal;
