import { useAdminOrderList, useInsertOrder } from "@/api/orders";
import { useInsertOrderSubscription } from "@/api/orders/Subscriptions";
import OrderListItem from "@/components/OrderListItem";
import { ActivityIndicator, FlatList, Text } from "react-native";

export default function OrderScreen() {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrderList({ archived: false });

  useInsertOrderSubscription();

  if (isLoading) return <ActivityIndicator />;
  if (error) return <Text> Failed to Fetch Orders</Text>;

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      contentContainerStyle={{ padding: 10, gap: 10 }}
    />
  );
}
