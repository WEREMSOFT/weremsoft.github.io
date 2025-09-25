SRC_DIR = blog/src
POSTS_DIR = blog/posts
BLOG_INDEX = blog/index.html

SRC_FILES = $(wildcard $(SRC_DIR)/*.txt)
HTML_FILES = $(patsubst $(SRC_DIR)/%.txt,$(POSTS_DIR)/%.html,$(SRC_FILES))

.PHONY: all clean index

all: index

index: $(HTML_FILES)
	@echo "Generando indice del blog..."
	@cat layout/blog_header.html.c > $(BLOG_INDEX)
	@for post in $$(ls -1r $(SRC_DIR)/*.txt); do \
		DATE=$$(head -n 1 $$post); \
		TITLE=$$(head -n 2 $$post | tail -n 1); \
		SUMMARY=$$(head -n 3 $$post | tail -n 1); \
		FILENAME=$$(basename $$post .txt); \
		printf "<li>\n" >> $(BLOG_INDEX); \
		printf "  <h3><a href=\"posts/%s.html\">%s</a></h3>\n" "$${FILENAME}" "$${TITLE}" >> $(BLOG_INDEX); \
		printf "  <small>%s</small>\n" "$${DATE}" >> $(BLOG_INDEX); \
		printf "  <p>%s</p>\n" "$${SUMMARY}" >> $(BLOG_INDEX); \
		printf "</li>\n" >> $(BLOG_INDEX); \
	done
	@cat layout/blog_footer.html.c >> $(BLOG_INDEX)

$(POSTS_DIR)/%.html: $(SRC_DIR)/%.txt
	@echo "Generando post: $@"
	@mkdir -p $(POSTS_DIR)
	@DATE=$$(head -n 1 $<) && \
	TITLE=$$(head -n 2 $< | tail -n 1) && \
	BODY=$$(tail -n +4 $<) && \
	cat layout/header.html.c > $@ && \
	printf "<h1>%s</h1>\n" "$${TITLE}" >> $@ && \
	printf "<p><em>%s</em></p>\n" "$${DATE}" >> $@ && \
	printf "%s\n" "$${BODY}" >> $@ && \
	cat layout/footer.html.c >> $@

clean:
	rm -f $(POSTS_DIR)/*.html $(BLOG_INDEX)
