import ProductView from "@/components/SelectProductsList";
import { getProducts } from "@/constants/Dataset";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        marginTop:10,
        justifyContent: "center",
        backgroundColor:'white'
      }}
    >
      <Text style={styles.h1}> Browse Products</Text>
      <ProductView productsList={getProducts()}/>
    </View>
  );
}
const styles = StyleSheet.create({
  h1:{
    fontSize:20,
    textAlign:'left',
    fontWeight:'600'
  }

})