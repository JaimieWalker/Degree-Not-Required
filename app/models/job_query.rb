class JobQuery < ApplicationRecord
	belongs_to :query
	belongs_to :job

	def self.create_job_query_association(query,job)
		return find_or_create_by(query_id: query.id, job_id: job.id)
	end
end


