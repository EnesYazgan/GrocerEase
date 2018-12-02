import scrapy

# running the spider:

# scrapy runspider get_recipe_urls.py -o recipe_urls.json

# this is a Spider from Scrapy, it crawls websites and clicks on things
class FoodSpider(scrapy.Spider):
    name = 'foodspider'
    # this is the url we start at
    start_urls = ['https://ndb.nal.usda.gov/ndb/search/list?maxsteps=6&format=&count=&max=25&sort=fd_s&fgcd=&manu=&lfacet=&qlookup=&ds=SR&qt=&qp=&qa=&qn=&q=&ing=&offset=0&order=asc']

    def parse(self, response):
        for table in response.css('.table > tbody:nth-child(2)'):
            # select name from table row
            for row in table.css('tr > td:nth-child(3)'):
                yield {'food_name': row.css('a::text').extract_first().strip()}

        # click the 'next' button and parse that page
        for next_page in response.css('.nextLink'):
            yield response.follow(next_page, self.parse)
