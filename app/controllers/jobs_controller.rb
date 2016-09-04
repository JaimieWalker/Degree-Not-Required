class JobsController < ApplicationController
	
	def index
		indeed = Indeed.new(Rails.application.secrets.INDEED_PUBLISHER_KEY)
		indeed_response = Indeed.api_request(indeed.construct_url(params))
		@indeed_response = indeed.model_data(indeed_response)
		render json: @indeed_response

	end
end
