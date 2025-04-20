import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from '.';
import { type Appointment } from 'src/providers/AppointmentProvider';

const mockData:Appointment = {
  id: 1,
  name: 'Dr. Jane Doe',
  photo: 'https://example.com/photo.jpg',
  specialty: 'Cardiologist',
  availability: ['10:00 AM', '11:00 AM'],
  location: 'New York',
};

const handleAddAppointment = vi.fn();


const renderCard = () => {
    render(
        <Card data={mockData} handleAddAppointment={handleAddAppointment} />
      );
  
}

describe('Card component', () => {
    beforeEach(() => {
        renderCard()
    })
  it('renders the doctor name, specialty, and image', () => {

    expect(screen.getByRole('region')).toBeInTheDocument();
    expect(screen.getByText('Dr. Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Cardiologist')).toBeInTheDocument();
    expect(screen.getByAltText(/photo of dr. jane doe/i)).toBeInTheDocument();
  });

  it('renders all availability time slots', () => {

    mockData.availability.forEach((slot) => {
      expect(screen.getByText(slot)).toBeInTheDocument();
    });
  });

  it('calls handleAddAppointment when button is clicked', () => {

    const button = screen.getByRole('button', {
      name: /book an appointment with dr. jane doe/i,
    });

    fireEvent.click(button);
    expect(handleAddAppointment).toHaveBeenCalledWith(mockData);
  });
});
