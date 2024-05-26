import { productInterface } from "./ProductInterface";

export interface RenderCategoryProps {
    displayName: string;
    onCheck: (newValue: boolean, displayName: string, childMap: any, parentKey: string) => void;
    parentKey?: string;
    childMap?: any;
    showCount?: boolean;
    level?: number;
}

export interface ProductViewProps {
    productsList: productInterface[];
}