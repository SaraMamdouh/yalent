import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Navbar from '.';


const mockHandleShowAppointments = vi.fn();
vi.mock('src/providers/AppointmentProvider', () => ({
    useAppointmentContext: () => ({
      appointments: [{ id: 1, name: 'Appointment 1' }, { id: 2, name: 'Appointment 2' }],
      handleShowAppointments:mockHandleShowAppointments,  
    }),
  }));

const renderComponent=()=>{
    render(<Navbar />);

}

describe('Navbar component', () => {
    beforeEach(() => {
        renderComponent()
    });
  it('renders the appointments count correctly', () => {

    expect(screen.getByText('2')).toBeInTheDocument(); 
  });

  it('calls handleShowAppointments when the button is clicked', () => {

    const button = screen.getByRole('button', { name: /Appointments/i });

    fireEvent.click(button);

  expect(mockHandleShowAppointments).toHaveBeenCalled()
  });

  it('renders the logo link correctly', () => {
    const logoLink = screen.getByRole('link', { name: /logo/i });
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('has appropriate aria-labels for accessibility', () => {
    const button = screen.getByRole('button', { name: /appointments/i });
    expect(button).toHaveAttribute('aria-label', 'View your 2 appointments');
    
    const navbarLinks = screen.getByRole('navigation');
    expect(navbarLinks).toBeInTheDocument();
    expect(navbarLinks).toHaveAttribute('aria-label', 'Navigation Links');
  });
});
