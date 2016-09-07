require "uri"
require "net/http"
require "json"
require "open-uri"
require "nokogiri"

class Indeed
	include RemoveDegree

	attr_accessor :api_key,:url, :total_results
	attr_reader :options
	def initialize(api_key)
		@total_results = 0
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
	def construct_url(params)
		@url = "http://api.indeed.com/ads/apisearch?publisher=#{api_key}&format=json"
		@options[:q] = params['query']
		@url << concat_struct_to_url
	
	end
=begin 
Takes the string for the urls api call and the request, and response which is an ActionDispatch::Request, response respectively
object with all the the info needed for the api call and returns a raw json file
=end
	def self.api_request(url)
		json = JSON.parse(Net::HTTP.get(URI(url)))
		@total_results = json["totalResults"].to_i
		return json
	end

# Gets all of the different options from the struct and concats them into a url safe string
	def concat_struct_to_url
		opts = ""
		 @options.each_pair{ |key,value|
			next if value == nil
			opts << "&#{key.to_s}=#{URI.escape(value.to_s)}"
		}
		return opts
	end


	def max_page_results(num=25)
	end
	
end