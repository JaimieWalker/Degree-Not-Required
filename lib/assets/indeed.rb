require "uri"
require "net/http"
require "json"
require "open-uri"
require "nokogiri"

class Indeed
	include RemoveDegree

	attr_accessor :api_key,:base_url, :url,:search_results
	attr_reader :options
	def initialize(api_key)
		@base_url = "http://api.indeed.com/ads/apisearch?publisher=#{api_key}&format=json"
		@url = @base_url
		@api_key = api_key
		@options = Url_Options.new(2,"json")
		@options[:total_results] = 0
		@options[:latlong] = 1
		@options[:limit] = 25
		@options[:start] = 0
		@search_results = []
	end

# Options that can be passed into the url
	Url_Options = Struct.new(:v,:format,:callback,:l,:sort,
		:radius,:st,:jt,:start,:limit,:fromage,:highlight,
		:filter,:latlong,:co,:chnl,:userip,:useragent,:q,:total_results)
# I know there is a gem for this but I want to do it myself
	
# Params is passed in from jobs controller in from the front end.
# Params is available at the controller level
	def construct_url(params)
		@url = "http://api.indeed.com/ads/apisearch?publisher=#{api_key}&format=json"
		@options[:q] = params["query"]
		@options[:userip] = params["userip"]
		@options[:useragent] = params["useragent"]
		@options[:l] = params["location"]
		@url << concat_struct_to_url
	end
=begin 
Takes the string for the urls api call and the request, and response which is an ActionDispatch::Request, response respectively
object with all the the info needed for the api call and returns a raw json file
=end
	def api_request
		json = JSON.parse(Net::HTTP.get(URI(url)))
		@options[:total_results] = json["totalResults"].to_i
		return json
	end

# Gets all of the different options from the struct and concats them into a url safe string
	def concat_struct_to_url
		opts = ""
		 @options.each_pair{ |key,value|
			next if value == nil || key == "total_results"
			opts << "&#{key.to_s}=#{URI.escape(value.to_s)}"
		}
		return opts
	end

	# increments number by limit-1 and returns a json of the next batch of jobs
	# Get the next request of unfiltered jobs
	def next_request
		@url = String.new(@base_url) 
		@options[:start] += (@options[:limit] - 1)
		@url << concat_struct_to_url
		return api_request
	end
# Gets results that don't have a degree
# Takes a json file taken straight from the api
	def get_results_with_no_degrees(json)
		begin
			no_degree_jobs = remove_degrees_from_indeed(json)
			# first call
			@search_results.concat(no_degree_jobs)

		rescue Errno::ETIMEDOUT => e
			retry
		end
	end


# Are we at the end of the results?
	def end_of_results?
		 return !(@options[:start].to_i < @options[:total_results]) 
	end

	def next_page_of_results(options)
		if (!end_of_results?)
			
			@options = options
			arr = get_results_with_no_degrees(next_request)	
			binding.pry
			return arr
		end
	end

	# def get_all_results_for_query(num_of_results=10)
	# 	while (!end_of_results? && num_of_results > 0) 
	# 		no_jerbs = get_results_with_no_degrees(next_request)
	# 		@search_results.concat(no_jerbs)
	# 		num_of_results -= 0
	# 	end
	# 	return @search_results
	# end
	
end