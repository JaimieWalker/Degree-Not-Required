class Query < ApplicationRecord
	has_many :jobs_queries
	has_many :jobs, through: :jobs_queries

end
