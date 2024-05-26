import getProductTree from "../ProductTree";

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
