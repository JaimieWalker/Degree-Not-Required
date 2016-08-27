class Indeed
	# Options that can be passed into the url
	Url_Options = Struct.new(:v,:format,:callback,:l,:sort,
		:radius,:st,:jt,:start,:limit,:fromage,:highlight,
		:filter,:latlong,:co,:chnl,:userip,:useragent,:q)
	# I know there is a gem for this but I want to do it myself
	attr_accessor :api_key 
	
	def initialize(api_key)
		@api_key = api_key
		@options = Url_Options.new(2,"json");
		binding.pry
	end
	# Passed in from the front end
	def constructUrl(params)
		url_base = "http://api.indeed.com/ads/apisearch?publisher=#{api_key}"
		"&format=json&q=java&l=austin%2C+tx&sort=&radius=&st=&jt=&start=&limit=&fromage=&filter=&latlong=1&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2"
	end
	
	
end