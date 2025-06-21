export async function getVehicles(filters: Record<string, unknown>) {
    console.log('fetching vehicles');
    console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
    const query = new URLSearchParams(sanitizeParams(filters)).toString();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articoli/lista-veicoli?${query}`, {
        cache: "no-store",
    });
    if (!res.ok) {
        throw new Error("Failed to fetch vehicles");
    }
    const data = await res.json();
    return {
        vehicles: data.data,
        count: data.count,
    };
}

export async function getFilters(query: Record<string, unknown>) {
    const queryString = new URLSearchParams(sanitizeParams(query)).toString();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articoli/filters?${queryString}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch filters");
    }

    return res.json();
}

function sanitizeParams(params: Record<string, unknown>): Record<string, string> {
    const sanitized: Record<string, string> = {};
    for (const [key, value] of Object.entries(params)) {
        if (
            typeof key === 'string' &&
            typeof value !== 'symbol' &&
            value !== undefined &&
            value !== null
        ) {
            sanitized[key] = String(value);
        }
    }
    return sanitized;
}
