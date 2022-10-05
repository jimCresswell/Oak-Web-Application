import { FC } from "react";

import Flex from "../Flex";
import SocialButtons from "../SocialButtons";
import { OAK_SOCIALS } from "../SocialButtons/SocialButtons";
import { P } from "../Typography";

const ClientErrorFooter: FC = () => {
  return (
    <Flex $ph={16} $mb={12} $mt={64} $width={"100%"}>
      <SocialButtons {...OAK_SOCIALS} />
      <Flex $alignItems={"center"}>
        <P $textAlign="center" $font={["body-4", "body-2"]}>
          © Oak National Academy
        </P>
      </Flex>
    </Flex>
  );
};

export default ClientErrorFooter;
