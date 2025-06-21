import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Vehicle {
    id: number;
    [key: string]: any;
}

interface ParcoVeicoliState {
    vehicles: Vehicle[];
    count: number;
    page: number;
    filters: Record<string, any>;
    hasMore: boolean;
    scrollPosition: number; // Nuova proprietà
    order: string; // Nuova proprietà
}

const initialState: ParcoVeicoliState = {
    vehicles: [],
    count: 0,
    page: 1,
    filters: {},
    hasMore: true,
    scrollPosition: 0, // Valore iniziale
    order: 'prezzo_DESC', // Ordine predefinito
};

const parcoVeicoliSlice = createSlice({
    name: "parcoVeicoli",
    initialState,
    reducers: {
        setVehicles(state, action: PayloadAction<Vehicle[]>) {
            state.vehicles = action.payload;
        },
        addVehicles(state, action: PayloadAction<Vehicle[]>) {
            state.vehicles = [...state.vehicles, ...action.payload];
        },
        setCount(state, action: PayloadAction<number>) {
            state.count = action.payload;
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        setOrder: (state, action) => {
            state.order = action.payload;
        },
        setFilters(state, action: PayloadAction<Record<string, any>>) {
            state.filters = action.payload;
        },
        setHasMore(state, action: PayloadAction<boolean>) {
            state.hasMore = action.payload;
        },
        setScrollPosition(state, action: PayloadAction<number>) { // Nuovo reducer
            state.scrollPosition = action.payload;
        },
        resetParcoVeicoli(state) {
            state.vehicles = [];
            state.count = 0;
            state.page = 1;
//            state.filters = {};
            state.hasMore = true;
            state.scrollPosition = 0;
        },
    },
});

export const {
    setVehicles,
    addVehicles,
    setCount,
    setPage,
    setOrder,
    setFilters,
    setHasMore,
    setScrollPosition, // Nuova azione
    resetParcoVeicoli,
} = parcoVeicoliSlice.actions;

export default parcoVeicoliSlice.reducer;
