export function formatPrice(price: number | string, showCurrency: boolean = true) {
    // Converte in numero, rimuovendo eventuali simboli, spazi o separatori
    const numericPrice = typeof price === "string"
        ? parseFloat(price.replace(/[^\d.,-]/g, "").replace(",", "."))
        : price;

    if (isNaN(numericPrice)) return "N/A";

    const numberFormat = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 0,
    });

    let formattedPrice = numberFormat.format(numericPrice);

    if (!showCurrency) {
        formattedPrice = formattedPrice.replace("€", "").trim();
    } else {
        formattedPrice = formattedPrice.replace(" €", "€");
    }

    return formattedPrice;
}
