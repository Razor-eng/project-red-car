import React, { ForwardedRef, useEffect, useState } from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from "@/lib/utils";

interface SliderProps {
    className?: string;
    min: number;
    max: number;
    step: number;
    formatLabel?: (value: number) => string;
    value: number[];
    onValueChange?: (values: number[]) => void;
    onValueCommit?: (values: number[]) => void;
}

const SliderRange = React.forwardRef((
    {
        className,
        min,
        max,
        step,
        formatLabel,
        value,
        onValueChange,
        onValueCommit,
        ...props
    }: SliderProps, ref: ForwardedRef<HTMLDivElement>
) => {
    const [localValues, setLocalValues] = useState<number[]>(value);

    useEffect(() => {
        setLocalValues(value);
    }, [value]);

    const handleValueChange = (newValues: number[]) => {
        // Update local values for label display
        setLocalValues(newValues);
        if (onValueChange) {
            onValueChange(newValues); // Update labels during movement
        }
    };

    const handleValueCommit = () => {
        if (onValueCommit) {
            onValueCommit(localValues); // Trigger filter update on release
        }
    };

    return (
        <SliderPrimitive.Root
            ref={ref}
            min={min}
            max={max}
            step={step}
            value={localValues}
            onValueChange={handleValueChange}
            className={cn('relative flex w-full touch-none select-none items-center', className)}
            onPointerUp={handleValueCommit}
            onKeyUp={(event) => {
                if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
                    handleValueCommit();
                }
            }}
            {...props}
        >
            <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
                <SliderPrimitive.Range className="absolute h-full bg-primary" />
            </SliderPrimitive.Track>
            {localValues.map((value, index) => (
                <SliderPrimitive.Thumb
                    key={index}
                    className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                />
            ))}
        </SliderPrimitive.Root>
    );
});

SliderRange.displayName = SliderPrimitive.Root.displayName;

export { SliderRange };
