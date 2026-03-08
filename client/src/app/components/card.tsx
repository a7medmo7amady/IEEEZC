import { cn } from './utils';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl shadow-2xl border border-ieee-blue/20 p-8',
        className
      )}
    >
      {children}
    </div>
  );
}
