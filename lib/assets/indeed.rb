require "uri"
require "net/http"
require "json"
class Indeed
	attr_accessor :api_key,:url
	def initialize(api_key)
		@api_key = api_key
		@options = Url_Options.new(2,"json")
		@options[:latlong] = 1
		@options[:limit] = 25
	end

# Options that can be passed into the url
	Url_Options = Struct.new(:v,:format,:callback,:l,:sort,
		:radius,:st,:jt,:start,:limit,:fromage,:highlight,
		:filter,:latlong,:co,:chnl,:userip,:useragent,:q)
# I know there is a gem for this but I want to do it myself
	
# Params is passed in from jobs controller in from the front end.
# Params is available at the controller level
	def constructUrl(params)
		url = "http://api.indeed.com/ads/apisearch?publisher=#{api_key}&format=json"
		@options[:q] = params['query']
		url += concat_struct_to_url
		return url
	end

	def self.api_request(url)
		return JSON.parse(Net::HTTP.get(URI(url)))
	end

# Gets all of the different options from the struct and concats them into a url safe string
	def concat_struct_to_url
		options = ""
		 @options.each_pair{ |key,value|
			next if value == nil
			options += "&#{key.to_s}=#{URI.escape(value.to_s)}"
		}
		return options
	end
	
	
end