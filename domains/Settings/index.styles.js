import { theme } from "@modules/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  text: {
    flexShrink: 1,
    fontSize: 16,
    color: "#555",
    marginVertical: 7,
  },
  horizontalLineGray: {
    borderBottomColor: "#D0D0D0",
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  horizontalLinePrimary: {
    borderBottomColor: theme.colors.primary,
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  mainContainer: {
    paddingLeft: "5%",
    paddingRight: "5%",
  },
  lineContainer: {
    marginBottom: 30,
  },
  textContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flexDirection: "row",
    marginLeft: "auto",
    marginTop: "auto",
    marginBottom: "auto",
    flex: 1,
  },
  svg: {
    marginLeft: "auto",
    marginTop: -3,
    marginBottom: -5,
  },
  languageContainer: {
    paddingTop: 10,
  },
});

export default styles;
