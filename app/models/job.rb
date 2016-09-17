class Job < ApplicationRecord
  belongs_to :company
  has_many :jobs_queries
  has_many :queries, through: :jobs_queries
end
