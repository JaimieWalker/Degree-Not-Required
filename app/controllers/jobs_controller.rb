class JobsController < ApplicationController
	
	def index
		indeed = Indeed.new(Rails.application.secrets.INDEED_PUBLISHER_KEY)
		indeed_response = Indeed.api_request(indeed.constructUrl(params))
		binding.pry

	end
end
