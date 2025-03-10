import { View, Text } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";

const product = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Stack.Screen options={{ title: "Details" + id }} />
      <Text style={{ fontSize: 20 }}>product Details screen for ID : {id}</Text>
    </View>
  );
};

export default product;
