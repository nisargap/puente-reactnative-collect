const configArray = {
  class: 'Assets',
  name: 'Asset',
  customForm: false,
  fields: [
    {
      label: 'dataCollection.newAsset',
      // add translation
      fieldType: 'header',
      formikKey: 'none_bi',
    },
    {
      label: 'assetCore.nameOfAssets',
      formikKey: 'name',
      value: '',
      fieldType: 'input',
      validation: false
    },
    {
      label: 'assetCore.getLocation',
      formikKey: 'location',
      value: {},
      fieldType: 'geolocation',
      validation: false
    },
    {
      label: 'global.commName',
      formikKey: 'communityname',
      value: '',
      fieldType: 'autofill',
      parameter: 'Communities',
      validation: false
    },
    {
      label: 'identificationForm.province',
      formikKey: 'province',
      value: '',
      fieldType: 'autofill',
      parameter: 'Province',
      validation: false
    },
    {
      label: 'assetCore.country',
      formikKey: 'country',
      value: '',
      fieldType: 'autofill',
      parameter: 'Country',
      validation: false
    }
  ]
};

export default configArray;
