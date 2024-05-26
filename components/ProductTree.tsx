import { productInterface, productMapInterface } from "@/types/ProductInterface";

//create map of products and place into each category, brand, model and variant
const getProductTree = (productsList: productInterface[])  => {
    let productTree: productMapInterface = productsList.reduce((acc:productMapInterface, product:{ category: string, brandName: string, model: string, variation: string }) => {
        if (!acc[product.category]) {
            acc[product.category] = {};
        }
        if (!acc[product.category][product.brandName]) {
            acc[product.category][product.brandName] = {};
        }
        if (!acc[product.category][product.brandName][product.model]) {
            acc[product.category][product.brandName][product.model] = {};
        }
        if (!acc[product.category][product.brandName][product.model][product.variation]) {
            acc[product.category][product.brandName][product.model][product.variation] = [];
        }
        acc[product.category][product.brandName][product.model][product.variation].push(product);
        return acc;
    }, {});
    return productTree
}

export default getProductTree;

