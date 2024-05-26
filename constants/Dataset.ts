export const getProducts = () => {
    const categoryConfig = {
        "Phones": {
            brands: ["Samsung", "Apple", "Google"],
            models: ["Galaxy S20", "iPhone 12", "Pixel 5"]
        },
        "Tablets": {
            brands: ["Apple", "Samsung", "Microsoft"],
            models: ["iPad Pro (2021)", "Galaxy Tab S7", "Surface Pro 8"]
        },
        "TVs": {
            brands: ["LG", "Sony", "Samsung"],
            models: ["OLED CX", "Bravia X900H", "Q80T"]
        },
        "Smartwatches": {
            brands: ["Apple", "Samsung", "Garmin"],
            models: ["Apple Watch Series 6", "Galaxy Watch 3", "Fenix 6X Pro Solar"]
        }
    };
    const variations = ["128GB", "256GB", "512GB", '1TB'];

    const products = [];

    for (const [category, { brands, models }] of Object.entries(categoryConfig)) {
        if (!brands || !models) {
            console.warn(`No brands or models specified for category ${category}. Skipping...`);
            continue;
        }

        for (const brand of brands) {
            for (let i = 0; i < 1500; i++) {
                let model = models[Math.floor(Math.random() * models.length)];
                let variant = variations[Math.floor(Math.random() * variations.length)]; // Random storage variant
                products.push({
                    category: category,
                    brandName: brand,
                    model: model,
                    variation: variant
                });
            }
        }
    }
    return products;
}
