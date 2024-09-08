import Header from "../../header/Header";
import IconCard from "../../generic/IconCard";

import patreonIcon from "../../../assets/FINAL-ASSETS-072821/final assets/fill-white-patreon-120px.png";
import custardIcon from "../../../assets/FINAL-ASSETS-072821/final assets/fill-white-custard-120px.png";

export default function SupportMobile(props) {
  return (
    <div className="supportPage">
      <IconCard
        icon={patreonIcon}
        title="Patreon"
        body={props.patreonBody}
        link="https://www.patreon.com/nate_and_mo"
        linkText="join the gang"
        isDesktop={false}
      />
      <IconCard
        icon={custardIcon}
        title="Buy Us a Custard"
        body={props.buyusacoffeeBody}
        link="https://www.buymeacoffee.com/nate_and_mo"
        linkText="feed us, pls"
        isDesktop={false}
        shouldFade={true}
        shouldAddBottomMargin={true}
      />
    </div>
  );
}
