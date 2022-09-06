import Link from "next/link";
import { FC } from "react";
import { useTheme } from "styled-components";

import FixedHeader from "../FixedHeader";
import Logo from "../Logo";

/**
 * We need a simple client-side error header which doesn't use context so that
 * the error boundary can be as high up the tree as possible.
 */
const ClientErrorHeader: FC = () => {
  const theme = useTheme();

  return (
    <FixedHeader $background={theme.header.background}>
      <Link href={"/"}>
        <a>
          <Logo title={"Oak National Academy"} height={48} width={104} />
        </a>
      </Link>
    </FixedHeader>
  );
};

export default ClientErrorHeader;
