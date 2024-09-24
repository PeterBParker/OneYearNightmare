import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { pageDataQuery } from "../../routes/ComicViewer";
import {
  CHAP_KEY,
  CHAP_ORDER_IN_BOOK,
  PARAM_PAGE_UUID,
} from "../../api/RefKeys";

export default function ChapterNumIcon() {
  const params = useParams();
  const { data, isLoading } = useQuery(pageDataQuery(params[PARAM_PAGE_UUID]));
  const [currPage, setCurrPage] = useState(null);
  let chapNum = 0;

  if (isLoading) {
    // TODO return tiny spinner
    chapNum = 0;
  } else {
    if (params.pageUuid != null && params.pageUuid !== currPage) {
      setCurrPage(params.pageUuid);
    }

    if (CHAP_KEY in data) {
      if (CHAP_ORDER_IN_BOOK in data[CHAP_KEY]) {
        // TODO move this subtraction into a central function
        chapNum = data[CHAP_KEY][CHAP_ORDER_IN_BOOK] - 1;
      }
    }
  }

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
