"use client";

import React, { useEffect, useRef, useState } from "react";
import hash from "object-hash";
import { useDispatch, useSelector } from "react-redux";
import {
  addVehicles,
  resetParcoVeicoli,
  setCount,
  setFilters,
  setHasMore,
  setPage,
  setVehicles,
} from "@/redux/parcoVeicoliSlice";
import { RootState } from "@/redux/store";
import ProductCard from "@/components/acquista/ProductCard";
import ProductCartNoleggio from "@/components/noleggia/ProductCartNoleggio";
import { Loader2 } from "lucide-react";

export default function InfiniteScroll({
  initialVehicles,
  initialCount,
  filters,
  pageSize,
  ItemComponent,
  typeSearch,
}: {
  initialVehicles: any[];
  initialCount: number;
  filters: string;
  pageSize: number;
  ItemComponent: React.ComponentType<any>;
  typeSearch: string;
}) {
  const dispatch = useDispatch();
  const { vehicles, count, page, hasMore } = useSelector(
    (state: RootState) => state.parcoVeicoli
  );
  const [loading, setLoading] = useState(false);
  const parsedFilters = JSON.parse(filters);

  const prevFilters = useRef(filters);

  const currentFilters = useSelector(
    (state: RootState) => state.parcoVeicoli.filters
  );

  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Ottieni i filtri salvati in Redux

    // Controlla se i filtri sono cambiati
    const filtersChanged = hash(currentFilters) !== hash(parsedFilters);

    if (filtersChanged) {
      console.log("Filters changed, updating Redux...");
      // Salva i nuovi filtri in Redux
      dispatch(setFilters(parsedFilters));

      // Resetta Redux e carica i nuovi veicoli
      dispatch(resetParcoVeicoli());
      dispatch(setVehicles(initialVehicles));
      dispatch(setCount(initialCount));
      dispatch(setPage(1));
      dispatch(setHasMore(initialVehicles.length < initialCount));
    } else if (vehicles.length === 0 && page === 1) {
      dispatch(setVehicles(initialVehicles));
      dispatch(setCount(initialCount));
      dispatch(setPage(1));
      dispatch(setHasMore(initialVehicles.length < initialCount));
    }
  }, [
    dispatch,
    parsedFilters,
    initialVehicles,
    initialCount,
    vehicles.length,
    page,
  ]);

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    const nextPage = page + 1;
    try {
      const query = new URLSearchParams({
        ...parsedFilters,
        order: parsedFilters.order || "prezzo_DESC",
        page: nextPage.toString(),
        pageSize: pageSize.toString(),
        typeSearch: typeSearch,
      }).toString();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/articoli/lista-veicoli?${query}`
      );
      const data = await res.json();

      dispatch(addVehicles(data.data));
      dispatch(setPage(page + 1));
      dispatch(setHasMore(data.data.length > 0));
    } catch (error) {
      console.error("Error loading more vehicles:", error);
    } finally {
      setLoading(false);
    }
  };

  // Trigger per caricare più dati quando l'utente scorre verso il fondo
  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeout.current) return;

      scrollTimeout.current = setTimeout(() => {
        const scrollPosition = window.scrollY + window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        if (scrollPosition >= documentHeight * 0.9) {
          loadMore();
        }

        scrollTimeout.current = null;
      }, 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore, page, dispatch]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-4 xl:gap-4 mb-10">
        {vehicles.map((vehicle: any, index: number) =>
          typeSearch === "vendita" ? (
            vehicle.tipoOfferta === "noleggio" ? (
              <ProductCartNoleggio
                key={index}
                product={vehicle}
                showBadge={true}
              />
            ) : (
              <ProductCard key={index} product={vehicle} />
            )
          ) : (
            <ItemComponent key={index} product={vehicle} />
          )
        )}
      </div>
      {loading && (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="animate-spin h-6 w-6 text-primary" />
          <span className="ml-2 text-primary text-sm">
            Caricamento in corso...
          </span>
        </div>
      )}
    </div>
  );
}
