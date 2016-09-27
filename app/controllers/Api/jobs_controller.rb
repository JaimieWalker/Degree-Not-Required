class Api::JobsController < ApplicationController
	# Guards against calls to the api, before action is faster than respond_to
	before_action :ensure_json_request, :set_user_agent_and_ip  

	def index
		indeed = Indeed.new(Rails.application.secrets.INDEED_PUBLISHER_KEY)
		indeed.construct_url(params)
		json = indeed.api_request
		results = indeed.get_results_with_no_degrees(json)
		# fill_page_with_results(json)
	    render :json => results	
	end


	def create
		 Query.create_query(params)
		 head :no_content
			
	end

	def ensure_json_request 
	  return if request.format == :json  
	  head :reset_content
	end

	def set_user_agent_and_ip
		params[:useragent] = request.user_agent
		params[:userip] = request.ip
	end

end
