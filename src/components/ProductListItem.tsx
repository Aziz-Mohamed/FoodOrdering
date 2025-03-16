import Colors from "@/constants/Colors";
import { defaultPizzaImage } from "@/constants/Images";
import { Tables } from "@/database.types";
import { Link, useSegments } from "expo-router";
import { Image, Pressable, StyleSheet, Text } from "react-native";


type ProductListItemProps = {
  product: Tables<"products">;
};
const ProductListItem = ({ product }: ProductListItemProps) => {
  const segments = useSegments();
  
  return (
    <Link href={`/${segments[0]}/menu/${product.id}`} asChild >
      <Pressable style={styles.container}>
        <Image
          source={{ uri: product.image || defaultPizzaImage }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}> {product.name}</Text>
        <Text style={styles.price}> ${product.price}</Text>
      </Pressable>
    </Link>
  );
};
export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    flex: 1,
    maxWidth: "50%",
  },
  image: { width: "100%", aspectRatio: 1 / 1 },
  title: { fontSize: 18, fontWeight: "700", marginVertical: 10 },
  price: { color: Colors.light.tint, fontWeight: "bold" },
});
