import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './index';



const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    title: 'Test Modal',
    children: <p>This is modal content</p>,
  };

  const renderComponent = (props?:any) => { 
    render(<Modal {...defaultProps} {...props}/>);

  }


describe('Modal component', () => {
beforeEach(() =>  { 
     renderComponent();
});
  afterEach(() => {
    vi.clearAllMocks();
  });


  it('should render title and content when open', () => {
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('This is modal content')).toBeInTheDocument();
  });

  it('should call onClose when clicking close button', () => {
    const closeButton = screen.getByRole('button', { name: /close modal/i });
    fireEvent.click(closeButton);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });



  it('should disable Confirm button when disabled prop is true', () => {
    const onSubmit = vi.fn();
    render(<Modal {...defaultProps} onSubmit={onSubmit} disabled={true} />);
    const confirmButton = screen.getByRole('button', { name: /confirm action/i });
    expect(confirmButton).toBeDisabled();
  });
});


describe('Modal accessibility', () => {
    beforeEach(()=>{
        renderComponent();
    })
  it('should have appropriate aria attributes', () => {
    const modal = screen.getByRole('dialog');
    expect(modal).toHaveAttribute('aria-modal', 'true');
    expect(modal).toHaveAttribute('aria-labelledby', 'modal-title');
  });

  it('should close modal when clicking outside of it', () => {
    const overlay = screen.getByLabelText('modal-overlay');
    fireEvent.click(overlay);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });
}       );

describe ("modal with submit button",()=>{

    it('should call onSubmit when Confirm button is clicked', () => {
        const onSubmit = vi.fn();
        renderComponent({onSubmit});

        const confirmButton = screen.getByRole('button', { name: /confirm action/i });
        fireEvent.click(confirmButton);
        expect(onSubmit).toHaveBeenCalled();
    });     
        
    
})