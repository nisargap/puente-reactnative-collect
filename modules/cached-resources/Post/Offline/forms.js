import { postObjectsToClass, postObjectsToClassWithRelation } from '../../../../services/parse/crud';

/** ***********************************************
 * Function to post offline id/sup forms not tied to a housheold
 * @name postForms
 * @example
 * postForms(idForms, supForms);
 *
 * @param {Array} idForms Array of id forms created offline
 * @param {Array} supForms Array of all supplementary forms created offline
 *
 *********************************************** */

function postForms(idForms, supForms) {
  return new Promise((resolve, reject) => {
    if (idForms !== null && idForms !== []) {
      idForms.forEach((postParams, index, array) => {
        if (!('householdId' in postParams.localObject)) {
          const offlineObjectID = postParams.localObject.objectId;
          const idParams = postParams;
          delete idParams.localObject.objectId;
          postObjectsToClass(idParams).then((object) => {
            const objectSanitized = JSON.parse(JSON.stringify(object));
            const parseObjectID = objectSanitized.objectId;
            if (supForms !== null && supForms !== []) {
              supForms.forEach((supForm) => {
                if (supForm.parseParentClassID === offlineObjectID) {
                  const supParams = supForm;
                  supParams.parseParentClassID = parseObjectID;
                  postObjectsToClassWithRelation(supParams).then(() => {
                  }, (error) => {
                    reject(error);
                  });
                }
              });
            }
          }, (error) => {
            reject(error);
          });
        }
        if (index === array.length - 1) resolve();
      });
    } else {
      resolve(true);
    }
  });
}

/** ***********************************************
 * Function to post offline sup forms tied to existing id forms
 * @name postSupForms
 * @example
 * postForms(supForms);
 *
 * @param {Array} supForms Array of all supplementary forms created offline
 *  @param {String} offlineUniqueId String of Offline Id

 *
 *********************************************** */
function postSupForms(supForms, offlineUniqueId) {
  return new Promise((resolve, reject) => {
    if (supForms !== null && supForms !== []) {
      supForms.forEach((supForm, index, array) => {
        // supplementary forms not tied to an offline ID form
        if (!supForm.parseParentClassID.includes(offlineUniqueId)) {
          postObjectsToClassWithRelation(supForm).then(() => {
          }, (error) => {
            reject(error);
          });
        }
        if (index === array.length - 1) resolve();
      });
    } else {
      resolve(true);
    }
  });
}

export {
  postForms,
  postSupForms
};
