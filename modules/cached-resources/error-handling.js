import { retrieveSignInFunction } from "@app/services/parse/auth";
import { getData } from "@modules/async-storage";
import { Parse } from "parse/react-native";

export default async function handleParseError(err, functionToCall, params) {
  return new Promise((resolve, reject) => {
    if (err.code === Parse.Error.INVALID_SESSION_TOKEN) {
      getData("currentUser").then(
        (currentUser) => {
          const { credentials } = currentUser;
          retrieveSignInFunction(
            credentials.username,
            credentials.password
          ).then(() =>
            functionToCall(params).then(
              () => {
                resolve(true);
              },
              (error) => {
                reject(error);
              }
            )
          );
        },
        (error) => {
          reject(error);
        }
      );
    }
  });
}
