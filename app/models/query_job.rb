class QueryJob < ApplicationRecord
	belongs_to :query
	belongs_to :job

	def create_query_job_association(query,job)
		
	end
end


