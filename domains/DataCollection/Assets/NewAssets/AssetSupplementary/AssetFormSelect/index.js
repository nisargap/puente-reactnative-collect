import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

import { assetFormsQuery } from '../../../../../../modules/cached-resources';
import { layout } from '../../../../../../modules/theme';
import styles from './index.style';

const AssetFormSelect = ({ setViewSupplementaryForms, setSelectedForm }) => {
  const [assetForms, setAssetForms] = useState([]);
  useEffect(() => {
    assetFormsQuery().then((forms) => {
      setAssetForms(forms);
    });
  }, []);

  const selectForm = (form) => {
    setViewSupplementaryForms(false);
    setSelectedForm(form);
  };

  return (
    <View>
      <ScrollView horizontal>
        {assetForms && assetForms.map((form) => (
          <Card
            key={form.objectId}
            style={layout.cardSmallStyle}
            onPress={() => selectForm(form)}
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
      </ScrollView>
    </View>
  );
};

export default AssetFormSelect;
