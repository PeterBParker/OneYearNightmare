// Keys used to map to Firebase Document References
export const DISPLAY_DATA_DOC_KEY = "book_data/display_data";
export const CHAP_CONTENTS_KEY = "book_data/content/chapters";
export const PAGES_CONTENTS_KEY = "book_data/content/pages";
export const COUNTS_DOC_KEY = "book_data/counts";

// Keys used to map to Firestore Fields
export const USERS_KEY = "all_users";
export const USER_DISPLAY_NAME = "display_name";
export const USER_URL = "avatar_url";

export const MAX_PAGE_ID_KEY = "max_page_id";
export const FIRST_PAGE_ID_KEY = "first_page_id";

export const PAGE_KEY = "page";
export const PAGE_ORDER_IN_CHAP = "chap_order";
export const PAGE_TIME_POSTED = "datetime";
export const PAGE_FILENAME = "filename";
export const PAGE_ORDER_IN_BOOK = "global_order";
export const PAGE_ICON_FILENAME = "icon_url";
export const PAGE_MESSAGE = "message";
export const PAGE_NEXT_PAGE_ID = "next_page_id";
export const PAGE_PREV_PAGE_ID = "prev_page_id";
export const PAGE_TITLE = "title";
export const PAGE_AUTHOR = "author";
export const PAGE_UUID = "uuid";
export const PAGE_CHAP_KEY = "chapter_id";
export const PAGE_URL = "public_url";
export const PAGE_SEASON_ID = "season_id";

export const CHAP_KEY = "chapter";
export const CHAP_ORDER_IN_BOOK = "order";
export const CHAP_PAGE_COUNT = "num_of_pages";

export const SEASON_CONTENTS_KEY = "all_seasons";
export const SEASON_PAGE_COUNT = "num_of_pages";

export const AUTHOR_KEY = "author";

export const GLOBAL_PAGE_COUNT = "pages";

// Keys used to map to url params
export const PARAM_PAGE_UUID = "pageUuid";

// Keys used to map to Firebase Storage Paths
export const PAGE_STORAGE_PATH = "pages/";
export const ICON_STORAGE_PATH = "pages/icons/";
export const RSS_FILE_PATH = "rss.xml";

// Query keys used to identify the query
export const USER_QUERY_KEY = "single_user_query";
