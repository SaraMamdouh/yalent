import Modal from "../../../components/Modal";
import {
  useAppointmentContext,
} from "../../../providers/AppointmentProvider";

type AppointmentsModalProps = {
    isOpen: boolean;
  onHide: () => void;
};

const AppointmentsModal: React.FC<AppointmentsModalProps> = ({
  isOpen,
  onHide,
}) => {

const {appointments} = useAppointmentContext();
  return (
    <Modal
      isOpen={isOpen}
      onClose={onHide}
      title= "Booked Appointments"
    >
    <table className="table-auto md:table-fixed w-full text-left border-collapse border border-gray-300">
       <thead className="bg-gray-200 text-gray-700 uppercase text-sm font-bold text-center">    
          <tr>
             <th className="border border-gray-300 w-1/3">Doctor</th>
             <th className="border border-gray-300 p-5">Time Slot</th>
             <th className="border border-gray-300 p-5">Specialty</th>
             <th className="border border-gray-300 p-5">Location</th>  
          </tr>
       </thead>
       <tbody className="border-t border-gray-300 overflow-y-auto text-center">   
          {
             appointments.map((appointment) => (
                <tr key={appointment.id} >
                    <td className="flex flex-col md:flex-row items-center gap-2 p-5">
                       <img src={appointment.photo} alt={appointment.name} className="w-16 h-16 md:w-20 md:h-auto rounded-full" />
                       <span className="font-bold text-center md:text-left">{appointment.name}</span>
                    </td>
                    <td className="border border-gray-300 p-5">{appointment.timeSlot}</td>
                    <td className="border border-gray-300 p-5">{appointment.specialty}</td>
                    <td className="border border-gray-300 p-5">{appointment.location}</td>
                </tr>
             ))
          }
       </tbody>
    </table>
    </Modal>
  );
};

export default AppointmentsModal;
