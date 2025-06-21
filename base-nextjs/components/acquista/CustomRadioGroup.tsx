"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

// Definiamo il tipo per ButtonGroupItem per includere `isChecked`
interface ButtonGroupItemProps extends React.ComponentPropsWithoutRef<"div"> {
    value: any;
    label: string;
    showCheck?: boolean;
    isChecked?: boolean;
    onClick?: () => void;
}

interface ButtonGroupProps {
    columns?: number;
    wrap?: boolean;
    allowDeselect?: boolean; // Opzione per attivare/disattivare la deselezione
    value?: any | null; // Permettiamo null esternamente
    onValueChange?: (value: string | null) => void; // Callback per cambiare il valore
    className?: string; // Supporta classi personalizzate
    children: React.ReactNode; // Gli elementi figli
    disabled?: boolean;
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
    ({ className, wrap = false, columns = 2, allowDeselect = false, value, onValueChange, children }, ref) => {
        const handleValueChange = (newValue: string) => {
            if (allowDeselect && value == newValue) {
                onValueChange?.(null); // Deseleziona se cliccato di nuovo
            } else {
                onValueChange?.(newValue); // Seleziona il nuovo valore
            }
        };

        return (
            <div
                ref={ref}
                className={cn(
                    wrap ? `flex flex-wrap gap-4` : `grid gap-4 grid-cols-${columns}`,
                    className
                )}
                style={{
                    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                }}
            >
            {React.Children.map(children, (child) => {
                if (React.isValidElement<ButtonGroupItemProps>(child)) {
                    return React.cloneElement(child, {
                        isChecked: child.props.value == value,
                        onClick: () => handleValueChange(child.props.value),
                    });
                }
                return child;
            })}
            </div>
        );
    }
);
ButtonGroup.displayName = "ButtonGroup";

const ButtonGroupItem = React.forwardRef<HTMLDivElement, ButtonGroupItemProps>(
    ({ className, label, showCheck = true, isChecked = false, onClick, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    `relative flex items-center justify-center px-4 py-2 h-10 rounded-md border text-center cursor-pointer transition-colors focus:outline-none`,
                    isChecked
                        ? "border-blue-700 text-blue-700 bg-blue-50"
                        : "border-gray-300 text-gray-500 bg-white hover:bg-gray-100",
                    className
                )}
                onClick={onClick}
                {...props}
            >
                <div className="flex items-center justify-between w-full">
                    <span className="text-sm font-medium">{label}</span>
                    {showCheck && isChecked && (
                        <CheckIcon className="ml-2 w-4 h-4 text-blue-700" />
                    )}
                </div>
            </div>
        );
    }
);
ButtonGroupItem.displayName = "ButtonGroupItem";

export { ButtonGroup, ButtonGroupItem };
