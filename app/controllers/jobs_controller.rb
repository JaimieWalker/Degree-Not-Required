class JobsController < ApplicationController
	
	def index
		indeed = Indeed.new(Rails.application.secrets.INDEED_PUBLISHER_KEY)
		
		@indeed_response = Indeed.api_request(indeed.construct_url(params),request,response)
		render json: @indeed_response

	end
end
