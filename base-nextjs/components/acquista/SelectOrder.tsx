"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SelectOrder({ initialOrder }: { initialOrder: string }) {
    const [order, setOrder] = useState(initialOrder);
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleChange = (value: string) => {
        setOrder(value);
        const params = new URLSearchParams(searchParams as any);
        params.set("order", value);
        router.push(`?${params.toString()}`);
    };

    return (
        <Select value={order} onValueChange={handleChange}>
            <SelectTrigger id="ordina__per" aria-label="Seleziona l'ordine dei risultati">
                <SelectValue placeholder="Ordina per Articolo" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="prezzo_DESC">Ordina per prezzo decrescente</SelectItem>
                <SelectItem value="prezzo_ASC">Ordina per prezzo crescente</SelectItem>
                <SelectItem value="anno_DESC">Ordina per anno decrescente</SelectItem>
                <SelectItem value="anno_ASC">Ordina per anno crescente</SelectItem>
                <SelectItem value="km_DESC">Ordina per km decrescente</SelectItem>
                <SelectItem value="km_ASC">Ordina per km crescente</SelectItem>
            </SelectContent>
        </Select>
    );
}
