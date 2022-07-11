import { FC, useState } from "react";
import styled from "styled-components";

import IconButton from "../Button/IconButton";

import Card from "./Card";

const CloseButtonWrapper = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
`;

const DismissableCard: FC = ({ children }) => {
  const [showBetaLink, setShowBetaLink] = useState(true);

  return (
    <div>
      {showBetaLink && (
        <Card background={"white"} mt={48} pr={48}>
          {children}
          <CloseButtonWrapper>
            <IconButton
              aria-label="Close Beta Banner"
              icon={"Close"}
              onClick={() => {
                setShowBetaLink(false);
              }}
            />
          </CloseButtonWrapper>
        </Card>
      )}
    </div>
  );
};

export default DismissableCard;
