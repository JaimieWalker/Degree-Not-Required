class Api::JobsController < ApplicationController
	
	def index
		indeed = Indeed.new(Rails.application.secrets.INDEED_PUBLISHER_KEY)
		indeed.construct_url(params)
		json = indeed.api_request
		results = indeed.fill_page_with_results(json)
		render json: results
	end

	def show
		
	end
end
