TWEETS=$(wildcard tweets/*.txt)

all: clean ../index.html

tweets.inc: $(TWEETS)
	@rm -f $@
	@for t in $$(ls -1 tweets/*.txt | sort -V -r); do \
	date=$$(head -n 1 $$t); \
	text=$$(tail -n +2 $$t); \
	  printf '%s\n' "<div class=\"tweet\"> \
	    <img class=\"avatar\" src=\"https://avatars.githubusercontent.com/u/808249?v=4\" alt=\"Avatar\">\
	    <div class=\"tweet-content\"> \
	      <div class=\"tweet-header\">@WeremSoft <span>@usuario</span></div> \
	      <div class=\"tweet-text\">$$text</div> \
	      <time>$$date</time> \
	    </div> \
	  </div>" >> $@; \
	done
	

../index.html: index.html.c tweets.inc
	cp header.jpeg ..
	cpp -P -traditional-cpp -nostdinc $< > $@

clean:
	rm -f tweets.inc ../index.html
