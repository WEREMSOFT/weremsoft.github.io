# weremsoft.github.io

This is a template for creating and hosting sites on github. There is a main, single page site, and a static blog generator.

The blog code is in blogSource folder. You add content creating entries in the "content folder". There are text files with a specific format.

## Blog entry format

Every .txt file in the blogsource/content folder must have the following information based on the lines:

* 1st line must have the title of the entry(catch phrase or pun to call the attention of the reader).
* 2nd line must be the Subtitle of the post(what's the post is about?)
* 3rd line must have the date
* 4th line must have the image url of the header of the blog entry
* 5th line and beyond is the rest of the post. Every new line will be enclosed in a <p></p> tags. You can include any kind of html code there. Youtube viedeos even javascript.

### Example

```javascript
Wellcome
Wellcome to my new blog. Write is a muscle, you must exercise.
Monday, May 8 of 2017
img/backgroundPost1.jpg
Hi! This is another intend to keep myself inteleccually active. Hope you enjoy it.

Generally I code stuff...

```



you MUST have the index.txt file with the moto of the blog. In my case is "I code stuff".

## How to build your blog

Remember that you build your BLOG not your home page. The site homepage is static. Also is the blog, but you have to build the blog after adding content.

Remember to run "npm install" INSIDE blogsource folder (you need node.js installed).

Run "node build" and all the blog will compile the files, and compy the css, js and images to the "blog" source.

Commit and push and it's donde (it can take some minutes to github to reflect the changes on your website)

You can see a live demostration in this video.

<iframe width="560" height="315" src="https://www.youtube.com/embed/PenkzgfuFDs" frameborder="0" allowfullscreen></iframe>
