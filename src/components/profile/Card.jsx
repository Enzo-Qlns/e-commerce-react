import { Card as CardFlowbite } from "flowbite-react";

export default function Card({
    className,
    children
}) {
    return (
        <CardFlowbite
            className={className}
        >
            {children}
        </CardFlowbite>
    )
}