import { render, screen, fireEvent } from '@testing-library/react';
import DoctorDetailsModal from './DoctorDetailsModal';
import { mock } from 'node:test';

const mockAddAppointment = vi.fn();
const onHide = vi.fn();

vi.mock('src/providers/AppointmentProvider', () => ({
    useAppointmentContext: () => ({
      appointments: [{ id: 1, name: 'Appointment 1' }, { id: 2, name: 'Appointment 2' }],
      addAppointment:mockAddAppointment,  
    }),
  }));


const mockDoctor = {
  id: 1,
  name: 'Dr. John Doe',
  specialty: 'Cardiology',
  photo: '/doctor.jpg',
  availability: ['10:00 AM', '11:00 AM'],
  location: 'New York',
};

const renderComponent=()=>{
  render(<DoctorDetailsModal data={mockDoctor} onHide={onHide} />);
}

describe('DoctorDetailsModal', () => {
  beforeEach(() => {  
    renderComponent();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders doctor details when data is provided', () => {
   
    expect(screen.getByText(mockDoctor.name)).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
    mockDoctor.availability.forEach((slot) => {
      expect(screen.getByText(slot)).toBeInTheDocument();
    }
    );
  });

  it('calls onHide when Close button is clicked', () => {
    const closeButton = screen.getByRole('button', { name: /close modal/i });
    fireEvent.click(closeButton);
    expect(onHide).toHaveBeenCalled();
  });

  it('allows selecting a time slot and confirming appointment', () => {

    const slotButton = screen.getByRole('button', { name: /10:00 AM/i });
    fireEvent.click(slotButton);

    const confirmButton = screen.getByText('Confirm');
    fireEvent.click(confirmButton);

    expect(mockAddAppointment).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 1,
        name: 'Dr. John Doe',
        timeSlot: '10:00 AM',
      })
    );

    expect(onHide).toHaveBeenCalled();
  });

  it('disables confirm button if no time slot selected', () => {
    const confirmButton = screen.getByText('Confirm');
    expect(confirmButton).toBeDisabled();
  });

  it('deselects time slot when clicked twice', () => {

    const timeButton = screen.getByRole('button', { name: /10:00 AM/i });
    fireEvent.click(timeButton); // select
    fireEvent.click(timeButton); // deselect

    const confirmButton = screen.getByText('Confirm');
    expect(confirmButton).toBeDisabled();
  });

  it('does not render modal if data is null', () => {
    const { container } = render(<DoctorDetailsModal data={null} onHide={vi.fn()} />);
    expect(container).toBeEmptyDOMElement();
  });
});


describe('DoctorDetailsModal accessibility', () => {    
  beforeEach(() => {
    renderComponent();
  });

  it('should have appropriate aria attributes', () => {
    const modal = screen.getByRole('dialog');
    expect(modal).toHaveAttribute('aria-modal', 'true');
    expect(modal).toHaveAttribute('aria-labelledby', 'modal-title');
  });

  
  it('should have appropriate aria-labels for buttons', () => {
    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toHaveAttribute('aria-label', 'Close modal');

    const confirmButton = screen.getByRole('button', { name: /confirm/i });
    expect(confirmButton).toHaveAttribute('aria-label', 'Confirm action');
  });
  it('should have appropriate aria-label for time slot buttons', () => {
    const timeButton = screen.getByRole('button', { name: /10:00 AM/i });
    expect(timeButton).toHaveAttribute('aria-label', 'Select 10:00 AM');
  });
  it('should have appropriate aria-label for modal overlay', () => {  
    const overlay = screen.getByLabelText('modal-overlay');
    expect(overlay).toBeInTheDocument();
  });
  it('should have appropriate aria-label for modal content', () => {
    const modalContent = screen.getByRole('dialog');
    expect(modalContent).toHaveAttribute('aria-label', 'modal');
  });
  it('should have appropriate aria-label for modal header', () => {   
    const modalHeader = screen.getByRole('heading', { name: /modal-title/i });
    expect(modalHeader).toBeInTheDocument();
  });
  it('should have appropriate aria-label for modal body', () => {   
    const modalBody = screen.getByRole('region');
    expect(modalBody).toBeInTheDocument();
  });    
});