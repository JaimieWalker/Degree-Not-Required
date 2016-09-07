class JobsController < ApplicationController
	
	def index
		indeed = Indeed.new(Rails.application.secrets.INDEED_PUBLISHER_KEY)
		indeed.construct_url(params)
		json = Indeed.api_request(indeed.url)
		binding.pry
		indeed.next_request
		render json: json
	end
end
