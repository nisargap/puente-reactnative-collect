import { Spinner } from 'native-base';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Button, Headline, Searchbar } from 'react-native-paper';

import { getData } from '../../modules/async-storage';
import I18n from '../../modules/i18n';
import checkOnlineStatus from '../../modules/offline';
import ResidentCard from '../FindResidents/Resident/ResidentCard';
import styles from './index.styles';
import parseSearch from './utils';

const ResidentIdSearchbar = ({ surveyee, setSurveyee, surveyingOrganization }) => {
  const [query, setQuery] = useState('');
  const [residentsData, setResidentsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [online, setOnline] = useState(true);
  const [searchTimeout, setSearchTimeout] = useState(null);

  useEffect(() => {
    checkOnlineStatus().then(async (connected) => {
      if (connected) fetchData(true, '');
      if (!connected) fetchData(false, '');
    });
  }, [surveyingOrganization]);

  const fetchOfflineData = async () => {
    setLoading(true);
    setOnline(false);

    getData('residentData').then((residentData) => {
      if (residentData) {
        let offlineData = [];
        getData('offlineIDForms').then((offlineResidentData) => {
          if (offlineResidentData !== null) {
            Object.entries(offlineResidentData).forEach(([key, value]) => { //eslint-disable-line
              offlineData = offlineData.concat(value.localObject);
            });
          }
          const allData = residentData.concat(offlineData);
          setResidentsData(allData.slice() || []);
        });
      }
      setLoading(false);
    });
  };

  const fetchOnlineData = async (qry) => {
    setLoading(true);
    setOnline(true);

    const records = await parseSearch(surveyingOrganization, qry);

    let offlineData = [];

    await getData('offlineIDForms').then((offlineResidentData) => {
      if (offlineResidentData !== null) {
        Object.entries(offlineResidentData).forEach(([key, value]) => { //eslint-disable-line
          offlineData = offlineData.concat(value.localObject);
        });
      }
    });

    const allData = records.concat(offlineData);
    setResidentsData(allData.slice());
    setLoading(false);
  };

  const fetchData = (onLine, qry) => {
    if (!onLine) fetchOfflineData();
    if (onLine) fetchOnlineData(qry);
  };

  const filterOfflineList = () => residentsData.filter(
    (listItem) => {
      const fname = listItem.fname || ' ';
      const lname = listItem.lname || ' ';
      const nickname = listItem.nickname || ' ';
      return fname.toLowerCase().includes(query.toLowerCase())
        || lname
          .toLowerCase()
          .includes(query.toLowerCase())
        || `${fname} ${lname}`
          .toLowerCase()
          .includes(query.toLowerCase())
        || nickname
          .toLowerCase()
          .includes(query.toLowerCase());
    }
  );

  const onChangeSearch = (input) => {
    clearTimeout(searchTimeout);

    setQuery(input);

    setSearchTimeout(setTimeout(() => {
      fetchData(online, input);
    }, 2000));
  };

  const onSelectSurveyee = (listItem) => {
    setSurveyee(listItem);
    setQuery('');
  };

  const renderItem = ({ item }) => (
    <View>
      <Button onPress={() => onSelectSurveyee(item)} contentStyle={{ marginRight: 5 }}>
        <Text style={{ marginRight: 10 }}>{`${item?.fname || ''} ${item?.lname || ''}`}</Text>
        {/* offline IDform */}
        {item.objectId.includes('PatientID-') && (
          <View style={{
            backgroundColor: '#f8380e',
            width: 1,
            height: 10,
            paddingLeft: 10,
            marginTop: 'auto',
            marginBottom: 'auto',
            borderRadius: 20
          }}
          />
        )}
      </Button>
    </View>
  );

  return (
    <View>
      <Headline style={styles.header}>{I18n.t('residentIdSearchbar.searchIndividual')}</Headline>
      <Searchbar
        placeholder="Type Here..."
        onChangeText={onChangeSearch}
        value={query}
      />
      <Button onPress={fetchData}>{I18n.t('global.refresh')}</Button>
      {loading
        && <Spinner color="blue" />}

      {query !== '' && (
        <FlatList
          data={online ? residentsData : filterOfflineList(residentsData)}
          renderItem={renderItem}
          keyExtractor={(item) => item.objectId}
        />
      )}

      {surveyee && surveyee.objectId && (
        <ResidentCard resident={surveyee} />
      )}
    </View>
  );
};

export default ResidentIdSearchbar;
