
// Button Component
interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
    onClick?: () => void;
}

export const Buttons: React.FC<ButtonProps> = ({ children, variant = 'primary', onClick }) => {
    const bgColor = variant === 'primary' ? 'bg-[#8DCA7E]' : 'bg-[#CCCCCC]';

    return (
        <button
            onClick={onClick}
            className={`${bgColor} text-white px-8 h-6  font-['Roboto',sans-serif] font-medium text-[13px] whitespace-nowrap hover:opacity-90 transition-opacity`}
        >
            {children}
        </button>
    );
}