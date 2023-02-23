import { Ionicons } from "@expo/vector-icons";
import Colors from "@modules/theme/colors";
import * as React from "react";

export default function TabBarIcon(props) {
  const { name, focused } = props;
  return (
    <Ionicons
      name={name}
      size={30}
      style={{
        marginBottom: -3,
      }}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}
