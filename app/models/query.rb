class Query < ApplicationRecord
	has_many :query_jobs
	has_many :jobs, through: :query_jobs

	def self.create_query(params)
		 query = find_or_create_by(keyword: params["formData"]["query"])
		 transaction do 
		 	params["jobs"].each do |job|
		 		# O(n^2) need to refactor
		 		j = Job.create_job(job)
		 	end
		 end
	end
end


