import { ProductViewProps, RenderCategoryProps } from '@/types/ProductFunctions';
import CheckBox from 'expo-checkbox'
import { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import getProductTree from './ProductTree';


let levelMap = {
    1: {
        styleKey: 'categoryTitle',
        countText: 'Devices'
    },
    2: {
        styleKey: 'brandTitle',
        countText: 'Devices'
    },
    3: {
        styleKey: 'modelTitle',
        countText: 'Devices'
    },
    4: {
        styleKey: 'variationTitle',
        countText: 'Devices'
    },
}

const RenderCategory:React.FC<RenderCategoryProps> = ({ displayName, onCheck, parentKey = '', childMap = {}, showCount = false, level = 1 }) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    const isBaseLevel = Array.isArray(childMap)
    const count = isBaseLevel ? childMap.length : Object.keys(childMap).length

    return (
        <>
            <View style={styles.childContainer}>
                <View style={styles.checkboxTitle}>
                    <CheckBox value={toggleCheckBox} onValueChange={(newValue) => { onCheck(newValue, displayName, childMap, parentKey); setToggleCheckBox(newValue) }} />
                    <Text style={styles[levelMap[level].styleKey]}>{displayName}</Text>
                </View>
                {(isBaseLevel || showCount) && toggleCheckBox && <Text style={styles.productCounts}>{count} + Devices</Text>}
                {
                    toggleCheckBox && !isBaseLevel && Object.keys(childMap).length && Object.entries(childMap).map(([key, value], j) => (
                        <RenderCategory key={j} parentKey={displayName} displayName={key} childMap={value} level={level + 1} onCheck={onCheck} />)
                    )
                }
            </View>
        </>
    )
}

// Main component
const ProductView: React.FC<ProductViewProps>  = ({ productsList}) => {
    const [selectedVariants, setVariants] = useState<{ [key: string]: any }>({});

    const saveProduct = (isChecked: boolean, displayName: string, childMap: any, parentKey: string): void => {
        let variants: { [key: string]: any } = { ...selectedVariants };
        let variantName = displayName;

        // If parentKey exists, it means a child variant is selected
        if (parentKey) {
            variantName = `${parentKey} ${displayName}`;
        }
        if (isChecked) {
            // If the selected variant is not present, initialize an empty object
            if (!variants[variantName]) {
                variants[variantName] = {};
            }
            // If childMap is not an array, it means there are further child variants
            if (!Array.isArray(childMap)) {
                // Recursively call saveProduct to handle child variants
                Object.entries(childMap).forEach(([key, value]) => {
                    saveProduct(true, key, value, variantName);
                });
            } else {
                variantName = `${variantName} ${childMap.join(' ')}`;
            }
        } else { // Remove variant on uncheck
            delete variants[variantName];
        }
        setVariants(variants);
    };
    const selectedVariantsArray = Object.entries(selectedVariants).map(([key, value], i) => ({
        key: i.toString(),
        variantName: key,
    }));

    const renderSelectedVariantItem: React.FC<{ item: { key: string; variantName: string } }> = ({ item }) => (
        <View style={styles.selectedTag}>
            <Text style={styles.tagText}>{item.variantName}</Text>
        </View>
    );
    const clearSelection = () => {
        setVariants({})
    }
    return (
        <View style={styles.parentView}>
            <View style={styles.container}>
                <FlatList data={Object.entries(getProductTree(productsList)).map(([category, brandName]) => ({
                    category,
                    brandName,
                    key: category
                }))} renderItem={({ item }) => <RenderCategory displayName={item.category} childMap={item.brandName} onCheck={saveProduct} />} />

            </View>
            <View style={styles.selectionContainer}>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    <Text style={styles.h2}>Selected Variants</Text>
                    {Object.keys(selectedVariants).length?
                    <Pressable style={styles.clearBtn} onPress={() => { clearSelection() }}>
                        <Text style={styles.clearText}> x Clear all</Text>
                    </Pressable>:<></>}
                </View>
                {Object.keys(selectedVariants).length ? 
                <FlatList
                    contentContainerStyle={{ alignSelf: 'flex-start', }}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={selectedVariantsArray}
                    renderItem={renderSelectedVariantItem}
                    keyExtractor={(item) => item.key}
                />
             : <Text>None Selected</Text>}
             </View>
        </View>
    );
};


const styles = StyleSheet.create({
    parentView: {
        flex: 1,
        alignSelf: 'flex-start',
    },
    container: {
        flex: 0.8,
        flexDirection: 'row',
        marginTop: 40,
        marginBottom: 30,
    },
    selectionContainer: {
        flex: 0.2,
        flexDirection: 'column',
        marginTop: 5,
        marginLeft: 10,
        marginBottom: 20,
    },
    h2: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5
    },
    selectedEntriesContainer: {
        flex: 1,
        flexDirection: 'row',
        gap: 5,
        flexWrap: 'wrap'
    },
    selectedTag: {
        backgroundColor: '#DBD9D8',
        width: 'auto',
        height: 'auto',
        borderRadius: 8,
        paddingVertical: 3,
        paddingHorizontal: 10,
        alignSelf: 'flex-start',
        marginLeft: 5,
        marginTop: 5
    },
    tagText: {
        textAlign: 'center'
    },
    category: {
        marginLeft: 0,
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginBottom: 20,
    },
    checkboxTitle: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    },
    categoryTitle: {
        fontSize: 20,
        color: 'darkblue',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    childContainer: {
        marginLeft: 20,
        marginBottom: 10,
    },
    brandTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    model: {
        marginLeft: 20,
        marginBottom: 5,
    },
    modelTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    variationTitle: {
        fontSize: 13,
        marginBottom: 10,
        fontWeight: '400'
    },
    productCounts: {
        marginLeft: 35,
        fontWeight: '500'
    },
    clearText: {
        fontSize: 10,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    clearBtn: {
        alignItems:'flex-start',
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 8,
        elevation: 3,
        backgroundColor: 'black',
    },
});
export default ProductView;