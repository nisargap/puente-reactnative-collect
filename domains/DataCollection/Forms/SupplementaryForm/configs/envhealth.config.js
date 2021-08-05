const configArray = {
  class: 'HistoryEnvironmentalHealth',
  name: 'environmentalHealth.name',
  customForm: false,
  fields: [{
    label: 'environmentalHealth.yearsLived.community',
    formikKey: 'yearsLivedinthecommunity',
    value: '',
    fieldType: 'select',
    options: [
      {
        label: 'environmentalHealth.yearsLived.less1',
        value: 'lessThan1'
      },
      {
        label: 'environmentalHealth.yearsLived.1_2',
        value: '1_2'
      },
      {
        label: 'environmentalHealth.yearsLived.3_4',
        value: '3_4'
      },
      {
        label: 'environmentalHealth.yearsLived.5_10',
        value: '5_10'
      },
      {
        label: 'environmentalHealth.yearsLived.moreThan10',
        value: 'moreThan10'
      }
    ],
    validation: false
  },
  {
    label: 'environmentalHealth.yearsLived.house',
    formikKey: 'yearsLivedinThisHouse',
    value: '',
    fieldType: 'select',
    options: [
      {
        label: 'environmentalHealth.yearsLived.less1',
        value: 'lessThan1'
      },
      {
        label: 'environmentalHealth.yearsLived.1_2',
        value: '1_2'
      },
      {
        label: 'environmentalHealth.yearsLived.3_4',
        value: '3_4'
      },
      {
        label: 'environmentalHealth.yearsLived.5_10',
        value: '5_10'
      },
      {
        label: 'environmentalHealth.yearsLived.moreThan10',
        value: 'moreThan10'
      }
    ],
    validation: false
  },
  {
    label: 'environmentalHealth.biggestProblemComm.label',
    formikKey: 'biggestproblemofcommunity',
    value: '',
    fieldType: 'selectMulti',
    options: [
      {
        label: 'environmentalHealth.biggestProblemComm.Water',
        value: 'Water'
      },
      {
        label: 'environmentalHealth.biggestProblemComm.Trash',
        value: 'Trash'
      },
      {
        label: 'environmentalHealth.biggestProblemComm.Street',
        value: 'Street'
      },
      {
        label: 'environmentalHealth.biggestProblemComm.AccessToBathrooms',
        value: 'AccessToBathrooms'
      },
      {
        label: 'environmentalHealth.biggestProblemComm.HouseArrangement',
        value: 'HouseArrangement'
      },
      {
        label: 'global.other',
        value: 'other',
        text: true,
        textKey: '__biggestproblemofcommunity__other'
      }
    ],
    validation: false
  },
  {
    label: 'environmentalHealth.waterAccess.label',
    formikKey: 'waterAccess',
    value: '',
    fieldType: 'select',
    options: [
      {
        label: 'environmentalHealth.waterAccess.everyday',
        value: 'everyday'
      },
      {
        label: 'environmentalHealth.waterAccess.4_6',
        value: '4-6AWeek'
      },
      {
        label: 'environmentalHealth.waterAccess.2_3',
        value: '2-3AWeek'
      },
      {
        label: 'environmentalHealth.waterAccess.1perWeek',
        value: '1AWeek'
      },
      {
        label: 'environmentalHealth.waterAccess.1perMonth',
        value: '1AMonth'
      },
      {
        label: 'environmentalHealth.waterAccess.never',
        value: 'Never'
      }
    ],
    validation: false
  },
  {
    label: 'environmentalHealth.typeOfWater.label',
    formikKey: 'typeofWaterdoyoudrink',
    value: '',
    fieldType: 'select',
    options: [
      {
        label: 'environmentalHealth.typeOfWater.bottled',
        value: 'bottled'
      },
      {
        label: 'environmentalHealth.typeOfWater.tap',
        value: 'tap'
      },
      {
        label: 'environmentalHealth.typeOfWater.filtered',
        value: 'filtered'
      }
    ],
    validation: false
  },
  {
    label: 'environmentalHealth.bathroomAccess.label',
    formikKey: 'bathroomAccess',
    value: '',
    fieldType: 'selectMulti',
    options: [
      {
        label: 'environmentalHealth.bathroomAccess.Bathroom',
        value: 'Bathroom'
      },
      {
        label: 'environmentalHealth.bathroomAccess.Latrine',
        value: 'Latrine'
      },
      {
        label: 'environmentalHealth.bathroomAccess.None',
        value: 'N'
      },
      {
        label: 'global.other',
        value: 'other',
        text: true,
        textKey: '__bathroomAccess__other'
      }
    ],
    validation: false
  },
  {
    label: 'environmentalHealth.latrineAccess',
    formikKey: 'latrineAccess',
    value: '',
    fieldType: 'select',
    options: [
      {
        label: 'global.yes',
        value: 'Yes'
      },
      {
        label: 'global.no',
        value: 'No'
      }
    ],
    validation: false
  },
  {
    label: 'environmentalHealth.clinicAccess.label',
    formikKey: 'clinicAccess',
    value: '',
    fieldType: 'selectMulti',
    options: [
      {
        label: 'environmentalHealth.clinicAccess.Clinic',
        value: 'Clinic/Medical_Center'
      },
      {
        label: 'environmentalHealth.clinicAccess.Polyclinic',
        value: 'Polyclinic'
      },
      {
        label: 'environmentalHealth.clinicAccess.Hospital',
        value: 'Hospital'
      },
      {
        label: 'environmentalHealth.clinicAccess.None',
        value: 'N'
      },
      {
        label: 'global.other',
        value: 'other',
        text: true,
        textKey: '__clinicAccess__other'
      }
    ],
    validation: false
  },
  {
    label: 'environmentalHealth.dentalAccess',
    formikKey: 'dentalAccess',
    value: '',
    fieldType: 'select',
    options: [
      {
        label: 'global.yes',
        value: 'Yes'
      },
      {
        label: 'global.no',
        value: 'No'
      }
    ],
    validation: false
  },
  {
    label: 'environmentalHealth.timesPerWeekTrash.label',
    formikKey: 'timesperweektrashcollected',
    value: '',
    fieldType: 'select',
    options: [
      {
        label: 'environmentalHealth.timesPerWeekTrash.Never',
        value: 'Never'
      },
      {
        label: 'environmentalHealth.timesPerWeekTrash.OnceAWeek',
        value: 'OnceAWeek'
      },
      {
        label: 'environmentalHealth.timesPerWeekTrash.TwiceAWeek',
        value: 'TwiceAWeek'
      },
      {
        label: 'environmentalHealth.timesPerWeekTrash.OnceOrTwiceAMonth',
        value: 'OnceOrTwiceAMonth'
      }
    ],
    validation: false
  },
  {
    label: 'environmentalHealth.houseOwnership',
    formikKey: 'houseownership',
    value: '',
    fieldType: 'select',
    options: [
      {
        label: 'global.yes',
        value: 'Y'
      },
      {
        label: 'global.no',
        value: 'N'
      }
    ],
    validation: false
  },
  {
    label: 'environmentalHealth.floorCondition.label',
    formikKey: 'floorCondition',
    value: '',
    fieldType: 'select',
    options: [
      {
        label: 'environmentalHealth.floorCondition.Poor',
        value: 'Poor'
      },
      {
        label: 'environmentalHealth.floorCondition.Working',
        value: 'Working'
      },
      {
        label: 'environmentalHealth.floorCondition.Excellent',
        value: 'Excellent'
      }
    ],
    validation: false
  },
  {
    label: 'environmentalHealth.floorMaterial.label',
    formikKey: 'floorMaterial',
    value: '',
    fieldType: 'selectMulti',
    options: [
      {
        label: 'environmentalHealth.floorMaterial.Dirt',
        value: 'Dirt'
      },
      {
        label: 'environmentalHealth.floorMaterial.Cement',
        value: 'Cement'
      },
      {
        label: 'environmentalHealth.floorMaterial.Wood',
        value: 'Wood'
      },
      {
        label: 'environmentalHealth.floorMaterial.Ceramic',
        value: 'Ceramic'
      }
    ],
    validation: false
  },
  {
    label: 'environmentalHealth.roofCondition.label',
    formikKey: 'conditionoRoofinyourhouse',
    value: '',
    fieldType: 'select',
    options: [
      {
        label: 'environmentalHealth.roofCondition.Poor',
        value: 'Poor'
      },
      {
        label: 'environmentalHealth.roofCondition.Working',
        value: 'Working'
      },
      {
        label: 'environmentalHealth.roofCondition.Excellent',
        value: 'Excellent'
      },
    ],
    validation: false
  },
  {
    label: 'environmentalHealth.typeStove.label',
    formikKey: 'stoveType',
    value: '',
    fieldType: 'select',
    options: [
      {
        label: 'environmentalHealth.typeStove.constructedVentilation',
        value: 'cementStove-Ventilation'
      },
      {
        label: 'environmentalHealth.typeStove.stoveTop',
        value: 'stoveTop'
      },
      {
        label: 'environmentalHealth.typeStove.openFire',
        value: 'openfire-noVentilation'
      }
    ],
    validation: false
  },
  {
    label: 'environmentalHealth.houseMaterials.label',
    formikKey: 'houseMaterial',
    value: '',
    fieldType: 'select',
    options: [
      {
        label: 'environmentalHealth.houseMaterials.zinc',
        value: 'zinc'
      },
      {
        label: 'environmentalHealth.houseMaterials.wood',
        value: 'wood'
      },
      {
        label: 'environmentalHealth.houseMaterials.partBlock_partWood',
        value: 'partBlock_partWood'
      },
      {
        label: 'environmentalHealth.houseMaterials.block',
        value: 'block'
      },
      {
        label: 'environmentalHealth.houseMaterials.brick',
        value: 'brick'
      },
      {
        label: 'environmentalHealth.houseMaterials.clay',
        value: 'clay'
      },
      {
        label: 'global.other',
        value: 'other',
        text: true,
        textKey: '__houseMaterial__other'
      }
    ],
    validation: false
  },
  {
    label: 'environmentalHealth.electricityAccess.label',
    formikKey: 'electricityAccess',
    value: '',
    fieldType: 'select',
    options: [
      {
        label: 'environmentalHealth.electricityAccess.never',
        value: 'never'
      },
      {
        label: 'environmentalHealth.electricityAccess.sometimes',
        value: 'sometimes'
      },
      {
        label: 'environmentalHealth.electricityAccess.always',
        value: 'always'
      }
    ],
    validation: false
  },
  {
    label: 'environmentalHealth.foodSecurity',
    formikKey: 'foodSecurity',
    value: '',
    fieldType: 'select',
    options: [
      {
        label: 'global.yes',
        value: 'Yes'
      },
      {
        label: 'global.no',
        value: 'No'
      },
      {
        label: 'global.notSure',
        value: 'not_sure'
      }
    ],
    validation: false
  },
  {
    label: 'environmentalHealth.govAssistance.label',
    formikKey: 'govAssistance',
    value: '',
    fieldType: 'select',
    options: [
      {
        label: 'environmentalHealth.govAssistance.foodStamps',
        value: 'solidaridad'
      },
      {
        label: 'environmentalHealth.govAssistance.adultLiteracy',
        value: 'aprendiendo'
      },
      {
        label: 'environmentalHealth.govAssistance.noAssistance',
        value: 'no_assistance'
      },
      {
        label: 'global.other',
        value: 'other'
      }
    ],
    validation: false
  },
  {
    label: 'environmentalHealth.numberIndividualsHouse',
    formikKey: 'numberofIndividualsLivingintheHouse',
    value: '',
    fieldType: 'numberInput',
    validation: true
  },
  {
    label: 'environmentalHealth.numberChildrenUnder5.label',
    formikKey: 'numberofChildrenLivinginHouseUndertheAgeof5',
    value: '',
    fieldType: 'selectMulti',
    options: [
      {
        label: 'environmentalHealth.numberChildrenUnder5.under_5',
        value: 'under_5'
      },
      {
        label: 'environmentalHealth.numberChildrenUnder5.6_12',
        value: '6-12'
      },
      {
        label: 'environmentalHealth.numberChildrenUnder5.13_18',
        value: '13-18'
      },
      {
        label: 'global.other',
        value: 'other',
        text: true,
        textKey: '__numberofChildrenLivinginHouseUndertheAgeof5__other'
      }
    ],
    validation: true
  },
  ]
};

export default configArray;
