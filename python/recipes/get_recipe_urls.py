import scrapy

# running the spider:

# scrapy runspider get_recipe_urls.py -o recipe_urls.json

# this is a Spider from Scrapy, it crawls websites and clicks on things
class RecipeSpider(scrapy.Spider):
    name = 'recipespider'
    # this is the url we start at
    start_urls = ['https://www.bonappetit.com/basically/recipes']

    def parse(self, response):
        # look for recipe titles that can be clicked on
        for link in response.css('.feature-item-hed'):
            # extract the link from the <a> tag
            yield {'href': link.css('a::attr(href)').extract_first()}

        # click the 'next' button and parse that page
        for next_page in response.css('nav.pager:nth-child(3) > a:nth-child(2)'):
            yield response.follow(next_page, self.parse)
