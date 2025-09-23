SRC_DIR = blog/src
POSTS_DIR = blog/posts
BLOG_INDEX = blog/index.html

SRC_FILES = $(wildcard $(SRC_DIR)/*.txt)
HTML_FILES = $(patsubst $(SRC_DIR)/%.txt,$(POSTS_DIR)/%.html,$(SRC_FILES))

.PHONY: all clean index

all: index

index: $(HTML_FILES)
	@echo "Generando indice del blog..."
	@./index_generator.sh > $(BLOG_INDEX)

$(POSTS_DIR)/%.html: $(SRC_DIR)/%.txt
	@echo "Generando post: $@"
	@mkdir -p $(POSTS_DIR)
	@./post_generator.sh $< > $@

clean:
	rm -f $(POSTS_DIR)/*.html $(BLOG_INDEX)
