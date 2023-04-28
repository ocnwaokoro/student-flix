## Project Outline
This is a NYU themed Netflix-style app that is meant to serve videos from youtube or from video url links. Users must be authenticated to be able to scroll through the app. Post authentication, users must choose whether or not they will watch a video or upload a video. If uploading, there is the option to upload video information and descriptors with the video src being a url link that goes straight to a video file online. If uploading from youtube, then the link that shows up in the browser when watching a youtube video is the video link that must be uploaded. Watching videos afterwards is very simple, and one must only click on the various play buttons. There is also a search button at the top to sift through the movie titles and find the one that is desired. For session store reasons, always sign out at the top left before exiting from the site.


## Sources 
This project was inspired by https://www.youtube.com/watch?v=mqUN4N2q4qY&list=TLPQMzAwMzIwMjNb_XB_8bC8AQ&index=2&ab_channel=CodeWithAntonio. 

The following links are completely original with the rest having heavy inspiration from the above tutorial.
components/Dropdown.tsxSearchButton.tsx
components/SearchButton.tsx
data/db.js
hooks/useSearchByTitle.ts
pages/api/search
pages/api/youtube
stylings on pages/auth.tsx
pages/upload.tsx
public/images


lib/mongodb.ts is inspired by https://authjs.dev/reference/adapter/mongodb

