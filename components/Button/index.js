import * as React from 'react';
import { Button } from 'react-native-paper';

import { layout, theme } from '../../modules/theme';

export default function PaperButton({
  onPressEvent, buttonText,
  mode, compact, icon, disabled, loading,
  style
}) {
  return (
    <Button
      icon={icon || ''}
      mode={mode || 'contained'}
      disabled={!!disabled}
      theme={theme}
      style={[layout.button, style]}
      onPress={onPressEvent}
      compact={!!compact}
      loading={!!loading}
    >
      {buttonText}
    </Button>
  );
}
