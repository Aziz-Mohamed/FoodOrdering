import { useAdminOrderList } from "@/api/orders";
import OrderListItem from "@/components/OrderListItem";
import { ActivityIndicator, FlatList, Text } from "react-native";

export default function OrderScreen() {

    const { data: orders, isLoading, error } = useAdminOrderList({archived: true});
    if(isLoading) return <ActivityIndicator/>
    if(error) return <Text> Failed to Fetch Orders</Text>
    
  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      contentContainerStyle={{ padding: 10 , gap: 10}}
    />
  );
}
