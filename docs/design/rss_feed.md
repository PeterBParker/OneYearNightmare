# RSS File Builder Design

## Requirements

- When a page is posted, the RSS file is updated to include the new page data
- When a page is updated, the RSS file is updated to include the updated page data
- I am able to rebuild the RSS file on command
- Only authorized users can write to the RSS file, but anyone can read it

## Ideas

- Use Cloud Functions to rebuild the RSS file in reaction to any page in the Pages collection being written to. This will result in the RSS file being updated in response to new pages and updated pages.
- How will I prevent it from grabbing pages that are scheduled to be posted but aren't yet visible?
  - Do I have a bool var on each Page object that is used to determine if the page should be displayed/included in the RSS feed?
  - If scheduled pages are kept in a separate collection we won't need to worry about this
  - Should design the scheduler...
- Build the RSS data in a Cloud Function and write it to a public file in Cloud Storage. Use a link to that file instead of the current RSS file link.
- Use Firebase rules to define authorized writing users
- Include a button on admin profiles to regen the RSS feed
