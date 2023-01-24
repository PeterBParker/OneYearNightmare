import ComicPageAPI from "../../api/ComicPageAPI";
import pageData from "../../api/data/pagesData.json";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function ChapterNumIcon() {
  const params = useParams();
  const [currPage, setCurrPage] = useState(pageData.maxDisplayPage);

  if (params.pageUuid != null && params.pageUuid != currPage) {
    setCurrPage(params.pageUuid);
  }

  let chapNum = ComicPageAPI.getChapterNum(currPage);

  return (
    <div className="volNumContainer ml-2 flex-shrink-0">
      <svg width="32px" height="32px">
        <g>
          <circle
            cx="14"
            cy="14"
            r="13"
            strokeWidth="2"
            stroke="#998f7e"
            fillOpacity="0%"
          ></circle>
          <text
            x="14"
            y="14"
            fill="#998f7e"
            className="headerVolNum"
            textAnchor="middle"
            alignmentBaseline="central"
          >
            {chapNum}
          </text>
        </g>
      </svg>
    </div>
  );
}
