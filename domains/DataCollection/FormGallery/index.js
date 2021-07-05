import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View
} from 'react-native';
import {
  Button, Card,
  IconButton,
  Paragraph, Text, Title
} from 'react-native-paper';

import ComingSoonSVG from '../../../assets/graphics/static/Adventurer.svg';
import SmallCardsCarousel from '../../../components/Cards/SmallCardsCarousel';
import { getData, storeData } from '../../../modules/async-storage';
import { customFormsQuery } from '../../../modules/cached-resources';
import I18n from '../../../modules/i18n';
import { layout, theme } from '../../../modules/theme';
import styles from './index.styles';

const FormGallery = ({
  navigateToNewRecord, navigateToCustomForm,
  puenteForms,
  pinnedForms, setPinnedForms,
  setLoading, surveyingOrganization
}) => {
  const [customForms, setCustomForms] = useState([]);

  useEffect(() => {
    getData('customForms').then((forms) => {
      setCustomForms(forms);
    });
  }, [customForms]);

  const refreshCustomForms = () => {
    setLoading(true);
    customFormsQuery(surveyingOrganization).then((forms) => {
      setCustomForms(forms);
      setLoading(false);
    });
  };

  const pinForm = async (form) => {
    setPinnedForms([...pinnedForms, form]);
    storeData(pinnedForms, 'pinnedForms');
  };

  const removePinnedForm = async (form) => {
    const filteredPinnedForms = pinnedForms.filter((pinnedForm) => pinnedForm !== form);
    setPinnedForms(filteredPinnedForms);
    storeData(filteredPinnedForms, 'pinnedForms');
  };

  return (
    <View>
      <View key="pinnedForms" style={layout.screenRow}>
        <Text style={styles.header}>{I18n.t('formsGallery.pinnedForms')}</Text>
        <ScrollView horizontal>
          {pinnedForms?.map((form) => (
            <Card
              key={form.objectId ?? form.tag}
              style={layout.cardSmallStyle}
              onPress={() => {
                if (!form.tag) return navigateToCustomForm(form);
                return navigateToNewRecord(form.tag);
              }}
              onLongPress={() => removePinnedForm(form)}
            >

              <View style={styles.cardContainer}>
                {form.image !== undefined && (
                  <form.image height={40} style={styles.svg} />
                )}
                <View style={styles.textContainer}>
                  <Text style={styles.text}>
                    { form.customForm === false ? I18n.t(form.name) : form.name}
                  </Text>
                </View>
              </View>
            </Card>
          ))}
          {pinnedForms?.length < 1 && (
            <View style={layout.screenRow}>
              <Card>
                <Card.Title title={I18n.t('formsGallery.noPinnedForms')} />
              </Card>
            </View>
          )}
        </ScrollView>
      </View>
      <View key="puenteForms" style={layout.screenRow}>
        <Text style={styles.header}>{I18n.t('formsGallery.puenteForms')}</Text>
        <SmallCardsCarousel
          puenteForms={puenteForms}
          navigateToNewRecord={navigateToNewRecord}
          pinForm={pinForm}
          setUser={false}
        />
      </View>
      <View key="customForms" style={layout.screenRow}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.header}>{I18n.t('formsGallery.customForms')}</Text>
          <IconButton
            style={{ bottom: 7 }}
            color={theme.colors.primary}
            size={20}
            icon="refresh"
            onPress={refreshCustomForms}
          />
        </View>
        <ScrollView horizontal>
          {customForms?.map((form) => (
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
          {customForms?.length < 1 && (
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
      <View style={layout.screenRow}>
        <Text style={styles.header}>{I18n.t('formsGallery.marketPlace')}</Text>
      </View>
      <View key="marketplace" style={layout.screenRow}>
        <Card>
          <Card.Content>
            <ComingSoonSVG width={200} height={200} />
            <Title>{I18n.t('formsGallery.ourMarketPlace')}</Title>
            <Paragraph>{I18n.t('formsGallery.discoverForms')}</Paragraph>
            <Button>
              <Text>{I18n.t('formsGallery.exploreForms')}</Text>
            </Button>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
};
export default FormGallery;
