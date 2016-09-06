class QueryJob < ApplicationRecord
	belongs_to :query 
	belongs_to :job
end
