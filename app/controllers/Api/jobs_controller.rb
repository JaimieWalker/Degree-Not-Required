class Api::JobsController < ApplicationController
	# Guards against calls to the api, before action is faster than respond_to
	before_action :ensure_json_request, :set_user_agent_and_ip  

	def index
		if (Query.exists?(keyword: params["query"],location: params["location"]))
			query = Query.find_by(keyword: params["query"],location: params["location"])
			render :json => query.jobs
		else
			indeed = Indeed.new(Rails.application.secrets.INDEED_PUBLISHER_KEY)
			indeed.construct_url(params)
			json = indeed.api_request
			first_results = indeed.get_results_with_no_degrees(json)
			Thread.new do
				if (first_results.size != 0)
					params["jobs"] = first_results
					create	
				end
			end
			session[:current_search] = indeed.options
		    render :json => first_results		
		end
	end
# Gets a new page of results
	def next_page
		indeed = Indeed.new(Rails.application.secrets.INDEED_PUBLISHER_KEY)
		next_page_result = indeed.next_page_of_results(session[:current_search])
		session[:current_search] = indeed.options
		render :json => next_page_result	
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
