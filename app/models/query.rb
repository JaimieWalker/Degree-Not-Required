class Query < ApplicationRecord
	has_many :query_jobs
	has_many :jobs, through: :query_jobs

end
