import React from 'react';

interface CTAButtonProps {
    text: string;
    variant?: 'primary' | 'secondary' | 'outline';
    className?: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

const CTAButton: React.FC<CTAButtonProps> = ({
    text,
    variant = 'primary',
    className = "",
    onClick,
    type = 'button',
    disabled = false
}) => {
    const baseClasses = "flex items-center justify-center rounded-lg h-12 px-6 text-base font-bold leading-normal tracking-[0.015em] transition-colors";

    const variantClasses = {
        primary: "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-primary/30",
        secondary: "bg-slate-200 text-slate-900 hover:bg-slate-300",
        outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white"
    };

    return (
        <button
            type={type}
            disabled={disabled}
            className={`${baseClasses} ${variantClasses[variant]} ${className} disabled:opacity-60 disabled:cursor-not-allowed`}
            onClick={onClick}
        >
            <span className="truncate">{text}</span>
        </button>
    );
};

export default CTAButton;
