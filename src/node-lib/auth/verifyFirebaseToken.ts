import { FirebaseError } from "firebase/app";

import OakError from "../../errors/OakError";
import { firebaseAdminAuth } from "../firebase";

const verifyFirebaseToken = async ({
  accessToken,
}: {
  accessToken: string;
}) => {
  try {
    const accessTokenData = await firebaseAdminAuth.verifyIdToken(accessToken);
    const { uid: firebaseUid, email } = accessTokenData;

    if (!email) {
      throw new Error("No email in access token");
    }

    return { firebaseUid, email };
  } catch (error) {
    if (
      error instanceof FirebaseError &&
      error.code === "auth/id-token-expired"
    ) {
      throw new OakError({ code: "auth/token-expired", originalError: error });
    }
    throw new OakError({
      code: "auth/token-error-unknown",
      originalError: error,
    });
  }
};

export default verifyFirebaseToken;
