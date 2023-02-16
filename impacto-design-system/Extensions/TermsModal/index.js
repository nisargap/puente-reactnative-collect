import I18n from "@modules/i18n";
// STYLING
import { theme } from "@modules/theme";
import React from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Headline, Modal, Portal, Text } from "react-native-paper";

export default function TermsModal(props) {
  const { visible, setVisible } = props;
  return (
    <Portal theme={theme}>
      <Modal
        visible={visible}
        theme={theme}
        contentContainerStyle={styles.modal}
        dismissable={false}
      >
        <ScrollView>
          <Headline theme={theme}>{I18n.t("termsModal.termsService")}</Headline>
          <Text>{I18n.t("termsModal.policy")}</Text>
          <Button
            mode="contained"
            theme={theme}
            color="#3E81FD"
            style={styles.button}
            onPress={() => setVisible(false)}
          >
            {I18n.t("termsModal.ok")}
          </Button>
        </ScrollView>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    padding: 30,
    margin: 30,
  },
  button: {
    marginTop: 30,
  },
});
