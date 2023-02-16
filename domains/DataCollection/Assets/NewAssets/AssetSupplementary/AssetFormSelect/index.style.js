import { theme } from "@modules/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
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
  componentContainer: {
    borderRadius: 10,
    backgroundColor: "#ccc",
    shadowColor: "#000",
    // shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default styles;
