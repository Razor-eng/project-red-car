// src/redux/Providers.tsx
"use client";

import { Provider } from "react-redux";
import { store } from "./store"; // Assicurati di importare correttamente il tuo store Redux

export function Providers({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
}
