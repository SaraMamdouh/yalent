import { render, screen, fireEvent } from '@testing-library/react';
import AppointmentsModal from './AppointmentsModal';
import { vi } from 'vitest';


const onHide = vi.fn();

// Mock useAppointmentContext
const mockAppointments = [
  {
    id: 1,
    name: 'Dr. Jane Doe',
    timeSlot: '2:00 PM',
    specialty: 'Dermatology',
    location: 'Room 101',
  },
  {
    id: 2,
    name: 'Dr. Sam Smith',
    timeSlot: '4:00 PM',
    specialty: 'Neurology',
    location: 'Room 202',
  },
];

vi.mock('src/providers/AppointmentProvider', () => ({
  useAppointmentContext: () => ({
    appointments: mockAppointments,
  }),
}));


const renderComponent = () => {
    render(<AppointmentsModal isOpen onHide={onHide} />);
};

describe('AppointmentsModal', () => {
    beforeEach(() => {
        renderComponent();
    });

  afterEach(() => {
    vi.clearAllMocks();
  });


  it('should render modal with table and appointment rows when open', () => {

    expect(screen.getByText('Booked Appointments')).toBeInTheDocument();
    mockAppointments.forEach((appointment) => {
      expect(screen.getByText(appointment.name)).toBeInTheDocument();
      expect(screen.getByText(appointment.timeSlot)).toBeInTheDocument();
      expect(screen.getByText(appointment.specialty)).toBeInTheDocument();
      expect(screen.getByText(appointment.location)).toBeInTheDocument();
    }
    );  
  });

  it('should call onHide when Close button is clicked', () => {
    fireEvent.click(screen.getByRole("button",{name: /close modal/i}));
    expect(onHide).toHaveBeenCalled();
  });

  it('should close modal when clicking outside of it', () => {
    const overlay = screen.getByLabelText('modal-overlay');
    fireEvent.click(overlay);
    expect(onHide).toHaveBeenCalled();
  });


  it('should render correct number of appointment rows', () => {
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(3);
  });
});
