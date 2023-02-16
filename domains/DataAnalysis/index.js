import Header from "@impacto-design-system/Extensions/Header";
import { layout } from "@modules/theme";
import * as React from "react";
import { Text, View } from "react-native";

export default function DataAnalysis() {
  return (
    <View style={layout.screenContainer}>
      <Header />
      <Text>Welcome to the data analysis page.</Text>
    </View>
  );
}
