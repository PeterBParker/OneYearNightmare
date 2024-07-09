import SupportMobile from "../components/creators/supportUsCards/SupportMobile";
import SupportDesktop from "../components/creators/supportUsCards/SupportDesktop";

import { useMediaQuery } from "react-responsive";
import querySizes from "../styling/breakpoints.json";

export default function Support() {
  const isTabletOrDesktop = useMediaQuery({ query: querySizes["lg"] });

  let patreonBody =
    "Join the fun on our discord channel with a\
    monthly $1 contribution. Join the conversation\
    and conspiracy theories, meet fellow readers,\
    participate in polls for specials, and be first to\
    know for promotions, merch, etc.";

  let buyusacoffeeBody =
    "Enjoy reading and want to give a one-time\
    gift to help us keep going? Buy us a custard.\
    Or maybe a coffee. Or the bubbles for a\
    boba tea. Regardless, your contribution is\
    treasured!";

  return isTabletOrDesktop ? (
    <SupportDesktop
      patreonBody={patreonBody}
      buyusacoffeeBody={buyusacoffeeBody}
    />
  ) : (
    <SupportMobile
      patreonBody={patreonBody}
      buyusacoffeeBody={buyusacoffeeBody}
    />
  );
}
