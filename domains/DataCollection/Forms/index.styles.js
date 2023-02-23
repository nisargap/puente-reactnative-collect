import { theme } from "@modules/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  textContainer: {
    flexDirection: "row",
  },
  text: {
    flexShrink: 1,
    textAlign: "center",
    color: theme.colors.primary,
    fontWeight: "bold",
    marginVertical: 7,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default styles;
