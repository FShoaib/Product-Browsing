import React from 'react';
import getProductTree from "../ProductTree";
import { render } from '@testing-library/react-native';
import ProductView from '../ProductBrowsing';


describe('getProductTree', () => {
    it('this function should return products in a tree view', () => {
        const productsList = [
            { category: 'Phones', brandName: 'Samsung', model: 'Galaxy S20', variation: '128GB' },
            { category: 'Tablets', brandName: 'Apple', model:'iPad Pro (2021)', variation: '512GB' },
        ];

        const expectedProductMap = {
            'Phones': {
                'Samsung': {
                    'Galaxy S20': {
                        '128GB': [{ category: 'Phones', brandName: 'Samsung', model: 'Galaxy S20', variation: '128GB' }],
                    }
                }
            },
            'Tablets': {
                'Apple': {
                    'iPad Pro (2021)': {
                        '512GB': [{ category: 'Tablets', brandName: 'Apple', model:'iPad Pro (2021)', variation: '512GB' }],
                    }
                }
            },
        };

        const result = getProductTree(productsList);
        expect(result).toEqual(expectedProductMap);
    });
});

describe('ProductView Component', () => {
    test('Selected variants show `None Selected` when array is empty', () => {
        const { getByText } = render(<ProductView productsList={[]} />);
        // Ensure the component renders the "None Selected" text when no variants are selected
        expect(getByText('None Selected')).toBeTruthy();
    });
});
