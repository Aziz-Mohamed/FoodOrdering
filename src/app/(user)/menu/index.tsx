import { useProductList } from "@/api/products";
import { supabase } from "@/lib/supabase";
import ProductListItem from "@components/ProductListItem";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, FlatList, Text } from "react-native";

export default function MenuScreen() {
  const { data: products, error, isLoading } = useProductList();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if(error){
    return <Text>Failed to fetch products</Text>
  }

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductListItem product={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
    />
  );
}
