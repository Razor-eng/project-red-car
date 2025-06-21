import { Suspense } from "react";
import { getFilters, getVehicles } from "@/app/acquista/utils";
import hash from "object-hash";
import FilterMenuMobile from "@/components/acquista/FilterMenuMobile";
import FilterMenu from "@/components/acquista/FilterMenu";
import SelectOrder from "@/components/acquista/SelectOrder";
import InfiniteScroll from "@/components/acquista/InfiniteScroll";
import ProductCard from "@/components/acquista/ProductCard";
import { Loader2 } from "lucide-react";

export default async function AcquistaPage({
  searchParams = {},
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const tipoVeicolo = "none";

  const page =
    searchParams?.page && typeof searchParams.page === "string"
      ? searchParams.page
      : "1";

  const pageSize =
    searchParams?.pageSize &&
    typeof searchParams.pageSize === "string" &&
    /^\d+$/.test(searchParams.pageSize)
      ? parseInt(searchParams.pageSize)
      : 20;

  const order =
    searchParams?.order && typeof searchParams.order === "string"
      ? searchParams.order
      : "prezzo_ASC";

  const filters: Record<string, string> = {};

  if (searchParams) {
    for (const key in searchParams) {
      const value = searchParams[key];
      if (
        !["page", "pageSize", "order"].includes(key) &&
        typeof value === "string"
      ) {
        filters[key] = value;
      }
    }
  }

  filters.tipoVeicolo = tipoVeicolo;

  const [vehicleResponse, filterResponse] = await Promise.all([
    getVehicles({ ...filters, page, pageSize, order }),
    getFilters(filters),
  ]);

  const { vehicles, count } = vehicleResponse;
  const filterData = filterResponse?.data || {};

  const filterMenuProps = {
    filters,
    marcaList: filterData.marca || [],
    modelloList: filterData.modello || [],
    alimentazioneList: filterData.alimentazione || [],
    cambioList: filterData.cambio || [],
    minMaxPrezzo: (filterData.prezzo || [0, 100000]).map(Number),
    minMaxKm: (filterData.km || [0, 200000]).map(Number),
    minMaxImmatricolazione: (
      filterData.anno || [2000, new Date().getFullYear()]
    ).map(Number),
  };

  const filterHash = hash({ ...filters, order });

  return (
    <>
      <div className="products-page-wrapper w-full">
        <div className="flex flex-col justify-between">
          <h1 className="font-black lg:hidden text-center text-3xl">
            Acquista
          </h1>
        </div>

        <Suspense
          fallback={
            <div className="flex justify-center items-center gap-2 py-6 text-primary animate-pulse">
              <Loader2 className="animate-spin w-5 h-5" />
              <span className="text-sm">Caricamento filtri...</span>
            </div>
          }
        >
          <FilterMenuMobile>
            <FilterMenu pageFrom={"acquista"} {...filterMenuProps} />
          </FilterMenuMobile>
        </Suspense>

        <div className="container-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full flex flex-col lg:flex-row lg:space-x-6">
            <div className="lg:w-64 xl:w-80">
              <div className="hidden lg:block sticky top-[100px] mb-10">
                <div className="h-[calc(100vh-100px)] overflow-y-auto">
                  <FilterMenu pageFrom={"acquista"} {...filterMenuProps} />
                </div>
              </div>
            </div>

            <div className="flex-1 py-4">
              <div className="flex max-lg:flex-col max-lg:w-full justify-between py-5">
                <div className="flex flex-col justify-between">
                  <h1 className="font-black max-lg:hidden text-4xl ">
                    Acquista
                  </h1>
                </div>

                <div className="selectOrder max-lg:flex-row-reverse max-lg:w-full flex flex-col justify-between">
                  <SelectOrder initialOrder={order || "prezzo_ASC"} />
                  <h3 className="font-medium text-lg max-lg:text-base max-sm:w-1/2 max-lg:text-left text-right py-3">
                    {count} risultati
                  </h3>
                </div>
              </div>

              <Suspense
                fallback={
                  <div className="flex justify-center items-center gap-2 py-6 text-primary animate-pulse">
                    <Loader2 className="animate-spin w-5 h-5" />
                    <span className="text-sm">Caricamento veicoli...</span>
                  </div>
                }
              >
                <InfiniteScroll
                  key={filterHash} // Cambia la chiave al cambiare dei filtri
                  initialVehicles={vehicles}
                  initialCount={count}
                  filters={JSON.stringify({ ...filters, order })}
                  pageSize={pageSize}
                  ItemComponent={ProductCard}
                  typeSearch={"vendita"}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
