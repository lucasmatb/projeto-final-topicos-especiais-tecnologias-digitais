import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  erro?: string;
  icone?: React.ReactNode;
  textarea?: boolean;
}

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ className, label, erro, icone, textarea, ...props }, ref) => {
    
    const baseClasses = cn(
      'w-full rounded-lg border bg-dark-800 px-4 text-white placeholder:text-dark-400',
      'transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
      erro ? 'border-red-500 focus:ring-red-500' : 'border-dark-700',
      icone ? 'pl-10' : '',
      className
    );

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-dark-200 mb-2">
            {label}
          </label>
        )}
        
        <div className="relative">
          {icone && (
            <div className={cn(
              "absolute left-3 text-dark-400 pointer-events-none",
              textarea ? "top-3" : "top-1/2 -translate-y-1/2"
            )}>
              {icone}
            </div>
          )}
          
          {textarea ? (
            <textarea
              ref={ref as any} // Cast necessário pois o ref genérico é união
              className={cn(baseClasses, "py-3 min-h-[120px] resize-y")}
              {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <input
              ref={ref as any}
              className={cn(baseClasses, "py-2.5")}
              {...props}
            />
          )}
        </div>
        
        {erro && (
          <p className="mt-1 text-sm text-red-400 animate-slide-up">
            {erro}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';