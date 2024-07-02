import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva("btn", {
	variants: {
		variant: {
			primary: "btn-success",
			secondary: "btn-outline",
			accent: "btn-error",
			ghost: "btn-ghost",
		},
		size: {
			default: "",
			lg: "btn-lg",
			md: "btn-md",
			sm: "btn-sm",
			xs: "btn-xs",
		},
	},
	defaultVariants: {
		variant: "secondary",
		size: "default",
	},
});

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

export function Button({
	className,
	variant,
	size,
	asChild,
	...props
}: ButtonProps) {
	const Comp = asChild ? Slot : "button";
	return (
		<Comp
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}
