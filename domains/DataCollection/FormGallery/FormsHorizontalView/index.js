import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import {
    Button, Card,
    IconButton,
    Paragraph, Text, Title
  } from 'react-native-paper';
import styles from '../index.styles';
import { layout, theme } from '../../../../modules/theme';

import I18n from '../../../../modules/i18n'

const FormsHorizontalView = ({ forms, header, navigateToCustomForm, pinForm }) => {

  return (
    <View key={header} style={layout.screenRow}>
        {header  && (
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.mediumHeader}>{header}</Text>
            </View>
        )}
        <ScrollView horizontal>
            {forms.map((form) => (
            <Card
                key={form.objectId}
                style={layout.cardSmallStyle}
                onPress={() => {
                    navigateToCustomForm(form);
                }}
                onLongPress={() => pinForm(form)}
            >
                <View style={styles.cardContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>
                    {form.name}
                    </Text>
                </View>
                </View>
            </Card>
            ))}
            {forms?.length < 1 && (
            <View style={layout.screenRow}>
                <Card>
                <Card.Title title={I18n.t('formsGallery.noCustomForms')} />
                {/* To be used when marketplace is available */}
                {/* <Card.Content>
                <Text>{I18n.t('formsGallery.checkOutMarketplace')}</Text>
                <Button>{I18n.t('formsGallery.viewMarketplace')}</Button>
            </Card.Content> */}
                </Card>
            </View>
            )}
        </ScrollView>
    </View>
  );
};

export default FormsHorizontalView;