import PropTypes from "prop-types";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Snackbar } from "react-native-paper";

const Toast = ({ text, visible, onDismiss, onClick, onClickLabel }) => (
  <View style={styles.container}>
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      action={{
        label: onClickLabel,
        onPress: () => onClick(),
      }}
    >
      {text}
    </Snackbar>
  </View>
);

// Toast.defaultProps = {
// //   color: 'primary',
// //   icon: '',
// //   disabled: false,
// //   loading: false
// };

Toast.propTypes = {
  //   color: PropTypes.oneOf(['primary', 'accent', 'empty', 'black']),
  //   icon: PropTypes.string,
  //   disabled: PropTypes.bool,
  //   loading: PropTypes.bool,
  //   onPress: PropTypes.func.isRequired
  text: PropTypes.string,
  visible: PropTypes.bool,
  onDismiss: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onClickLabel: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});

export default Toast;
