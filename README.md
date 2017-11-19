# weremsoft.github.io

This is a template for creating and hosting sites on github. There is a main, single page site, and a static blog generator.

The blog code is in blogSource folder. You add content creating entries in the "content folder". There are text files with a specific format.

## Blog entry format

Every .txt file in the blogsource/content folder must have the following information based on the lines:

* 1st line must have the title of the entry.
* 2nd line must have the date
* 3rd line must have the image url of the header of the blog entry
* 4th line and beyond is the rest of the post. Every new line will be enclosed in a <p></p> tags. You can include any kind of html code there. Youtube viedeos even javascript.

you MUST have the index.txt file with the moto of the blog. In my case is "I code stuff".

## How to build your blog

Remember that you build your BLOG not your home page. The site homepage is static. Also is the blog, but you have to build the blog after adding content.

Remember to run "npm install" INSIDE blogsource folder (you need node.js installed).

Run "node build" and all the blog will compile the files, and compy the css, js and images to the "blog" source.

