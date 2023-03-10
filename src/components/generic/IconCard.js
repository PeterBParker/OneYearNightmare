export default function Support(props) {
  return (
    <div
      className={`${
        props.isDesktop ? "desktopIconCardContainer" : "mobileIconCardContainer"
      } ${props.shouldFade ? "whiteBackgroundColorFade" : "bg-white"} ${
        props.shouldAddBottomMargin ? "mb-16" : null
      } width-full`}
    >
      <div className="test">
        <div className="iconCardHeader">
          <img
            src={props.icon}
            width={`${props.isDesktop ? "180" : "120"}`}
            className={`${props.isDesktop ? "py-8" : "py-4"} mx-auto`}
            alt=""
          />
        </div>
        <div
          className={`iconCardTitle font-header text-grey-light font-bold text-3xl ${
            props.isDesktop ? "text-4xl mb-6" : "text-3xl mb-4"
          }`}
        >
          <p>{props.title}</p>
        </div>
        <div
          className={`iconCardBody font-body text-grey-light text-left mx-6 ${
            props.isDesktop ? "text-lg" : ""
          }`}
        >
          <p>{props.body}</p>
        </div>
      </div>
      <div className="iconCardButton clearfix px-6 pt-5 pb-10">
        <div>
          <a
            className={`transition duration-500 ease-in-out bg-cream-dark hover:bg-eggshell bg-cream-light py-2 px-4 float-left font-medium font-header rounded-lg ${
              props.isDesktop ? "text-2xl" : "text-xl"
            }`}
            href={props.link}
          >
            {props.linkText.toUpperCase()} →
          </a>
        </div>
      </div>
    </div>
  );
}
