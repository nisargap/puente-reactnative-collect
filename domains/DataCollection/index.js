// import * as React from 'react';
import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView, Platform,
  ScrollView, Text, View
} from 'react-native';
import {
  Button, Card
} from 'react-native-paper';

import ComingSoonSVG from '../../assets/graphics/static/Adventurer.svg';
import FindRecordSVG from '../../assets/graphics/static/Find-Record-Icon.svg';
import ResearchSVG from '../../assets/graphics/static/Research.svg';
import NewRecordSVG from '../../assets/icons/New-Record-icon.svg';
import FindResidents from '../../components/FindResidents';
import Header from '../../components/Header';
import MapView from '../../components/MapView';
import { getData, storeData } from '../../modules/async-storage';
import { customFormsQuery } from '../../modules/cached-resources';
import I18n from '../../modules/i18n';
import { layout } from '../../modules/theme';
import { retrieveSignOutFunction } from '../../services/parse/auth';
import SettingsView from '../Settings';
import Assets from './Assets';
import FormGallery from './FormGallery';
import Forms from './Forms';
import styles from './index.styles';

const puenteForms = [
  { tag: 'id', name: 'Resident ID' },
  { tag: 'env', name: 'Environmental Health' },
  { tag: 'med-eval', name: 'Medical Evaluation' },
  { tag: 'vitals', name: 'Vitals' }
];

const DataCollection = ({ navigation }) => {
  const [scrollViewScroll, setScrollViewScroll] = useState();
  const [view, setView] = useState('Root');
  const [settings, setSettings] = useState(false);
  const [selectedForm, setSelectedForm] = useState('id');
  const [selectedAsset, setSelectedAsset] = useState(null);

  const [customForms, setCustomForms] = useState([]);
  const [pinnedForms, setPinnedForms] = useState([]);
  const [customForm, setCustomForm] = useState();

  const [selectPerson, setSelectPerson] = useState();
  const [surveyee, setSurveyee] = useState({});

  const [surveyingOrganization, setSurveyingOrganization] = useState('');
  const [surveyingUser, setSurveyingUser] = useState();

  useEffect(() => {
    getData('currentUser').then((user) => {
      setSurveyingUser(`${user.firstname || ''} ${user.lastname || ''}`);
    });
    getData('organization').then((org) => {
      setSurveyingOrganization(org || surveyingOrganization);
    }).catch(() => {
      setSurveyingOrganization(surveyingOrganization || '');
    });
    getData('customForms').then((forms) => {
      setCustomForms(forms);
    });
    getData('pinnedForms').then((forms) => {
      if (forms) setPinnedForms(forms);
    });
  });

  const navigateToRoot = async () => {
    setView('Root');
  };

  const navigateToNewRecord = async (formTag, surveyeePerson) => {
    await getData('organization').then((org) => {
      setSurveyingOrganization(org || surveyingOrganization || '');
      setView('Forms');
      setSurveyee(surveyeePerson || surveyee);
      setSelectedForm(formTag || 'id');
    });
  };

  const navigateToGallery = async () => {
    await getData('organization').then((org) => {
      setSurveyingOrganization(org || surveyingOrganization || '');
      setView('Gallery');
    });
  };

  const navigateToNewAssets = async () => {
    await getData('organization').then((org) => {
      setSurveyingOrganization(org || surveyingOrganization || '');
      setView('Assets');
      setSelectedAsset({});
    });
  };

  const navigateToViewAllAssets = async () => {
    await getData('organization').then((org) => {
      setSurveyingOrganization(org || surveyingOrganization || '');
      setView('Assets');
      setSelectedAsset(null);
    });
  };

  const navigateToCustomForm = async (form, surveyeePerson) => {
    await getData('organization').then((org) => {
      setSurveyingOrganization(org || surveyingOrganization || '');
      setView('Forms');
      setSurveyee(surveyeePerson || surveyee);
      setSelectedForm('custom');
      setCustomForm(form || '');
    });
  };

  const navigateToFindRecords = async () => {
    await getData('organization').then((org) => {
      setSurveyingOrganization(org || surveyingOrganization || '');
      setView('Find Records');
    });
  };

  const refreshCustomForms = async () => {
    customFormsQuery(surveyingOrganization).then((forms) => {
      setCustomForms(forms);
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

  const logOut = async () => {
    await retrieveSignOutFunction().then(() => {
      navigation.navigate('Sign In');
    });
  };

  return (
    <View
      style={layout.screenContainer}
      onStartShouldSetResponderCapture={() => {
        setScrollViewScroll(true);
      }}
    >
      <Header
        view={view}
        setView={setView}
        setSettings={setSettings}
      />
      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView keyboardShouldPersistTaps="never" scrollEnabled={scrollViewScroll}>
          {settings === true ? (
            <SettingsView
              setView={setView}
              setSettings={setSettings}
              logOut={logOut}
            />
          ) : (
            <View>
              { view === 'Root' && (
                <View>
                  <MapView organization={surveyingOrganization} />
                  <View style={styles.screenFlexRowWrap}>
                    <View style={styles.cardContainer}>
                      <Card style={styles.cardSmallStyle} onPress={() => navigateToNewRecord()}>
                        <NewRecordSVG height={70} style={styles.svg} />
                        <Text style={styles.text}>{I18n.t('dataCollection.newRecord')}</Text>
                      </Card>
                      <Card style={styles.cardSmallStyle} onPress={navigateToFindRecords}>
                        <FindRecordSVG height={65} style={styles.svg} />
                        <Text style={styles.text}>{I18n.t('dataCollection.findRecord')}</Text>
                      </Card>
                    </View>
                    <Card style={styles.cardSmallStyle} onPress={navigateToGallery}>
                      <ComingSoonSVG height={65} style={styles.svg} />
                      <Text style={styles.text}>{I18n.t('dataCollection.viewAll')}</Text>
                    </Card>
                    <View style={styles.cardContainer}>
                      <Card style={styles.cardSmallStyle} onPress={navigateToNewAssets}>
                        <ResearchSVG height={70} width={70} style={styles.svg} />
                        <Text style={styles.text}>{I18n.t('dataCollection.newAsset')}</Text>
                      </Card>
                      <Card style={styles.cardSmallStyle} onPress={navigateToViewAllAssets}>
                        <ResearchSVG height={70} width={70} style={styles.svg} />
                        <Text style={styles.text}>{I18n.t('dataCollection.viewAssets')}</Text>
                      </Card>
                    </View>
                  </View>
                </View>
              )}
              {view === 'Forms' && (
                <View>
                  <Button icon="arrow-left" width={100} onPress={navigateToRoot}>
                    <Text>{I18n.t('dataCollection.back')}</Text>
                  </Button>
                  <Forms
                    style={layout.line}
                    navigation={navigation}
                    scrollViewScroll={scrollViewScroll}
                    setScrollViewScroll={setScrollViewScroll}
                    navigateToGallery={navigateToGallery}
                    navigateToNewRecord={navigateToNewRecord}
                    navigateToRoot={navigateToRoot}
                    navigateToCustomForm={navigateToCustomForm}
                    selectedForm={selectedForm}
                    setSelectedForm={setSelectedForm}
                    surveyingUser={surveyingUser}
                    surveyingOrganization={surveyingOrganization}
                    surveyee={surveyee}
                    setSurveyee={setSurveyee}
                    customForm={customForm}
                    setView={setView}
                    pinnedForms={pinnedForms}
                  />
                </View>
              )}
              {view === 'Assets' && (
                <View>
                  <Button icon="arrow-left" width={100} onPress={navigateToRoot}>
                    <Text>{I18n.t('dataCollection.back')}</Text>
                  </Button>
                  <Assets
                    surveyingOrganization={surveyingOrganization}
                    surveyingUser={surveyingUser}
                    selectedAsset={selectedAsset}
                    setSelectedAsset={setSelectedAsset}
                    navigateToNewAssets={navigateToNewAssets}
                    navigateToViewAllAssets={navigateToViewAllAssets}
                  />
                </View>
              )}
              {view === 'Gallery' && (
                <View>
                  <Button icon="arrow-left" width={100} onPress={navigateToRoot}>
                    <Text>{I18n.t('dataCollection.back')}</Text>
                  </Button>
                  <FormGallery
                    navigation={navigation}
                    navigateToNewRecord={navigateToNewRecord}
                    puenteForms={puenteForms}
                    navigateToCustomForm={navigateToCustomForm}
                    customForms={customForms}
                    refreshCustomForms={refreshCustomForms}
                    pinnedForms={pinnedForms}
                    removePinnedForm={removePinnedForm}
                    pinForm={pinForm}
                  />
                </View>
              )}
              {view === 'Find Records'
                && (
                  <View>
                    {!selectPerson && (
                      <Button icon="arrow-left" width={100} onPress={navigateToRoot}>
                        <Text>{I18n.t('dataCollection.back')}</Text>
                      </Button>
                    )}
                    <FindResidents
                      selectPerson={selectPerson}
                      setSelectPerson={setSelectPerson}
                      organization={surveyingOrganization}
                      puenteForms={puenteForms}
                      navigateToNewRecord={navigateToNewRecord}
                      surveyee={surveyee}
                      setSurveyee={setSurveyee}
                      navigateToRoot={navigateToRoot}
                      setView={setView}
                    />
                  </View>
                )}
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default DataCollection;
