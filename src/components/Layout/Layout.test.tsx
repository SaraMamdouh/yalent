import React from 'react';
import { render, screen } from '@testing-library/react';
import withLayout from '.';



describe('Layout HOC', () => {
  const DummyComponent = () => <div>Dummy Content</div>;
  const WrappedComponent = withLayout(DummyComponent);

  it('renders the wrapped component within layout', () => {
    render(<WrappedComponent />);
    expect(screen.getByText('Dummy Content')).toBeInTheDocument();
  });
});
