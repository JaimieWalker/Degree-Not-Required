class Job < ApplicationRecord
  belongs_to :company
  has_many :query_jobs
  has_many :queries, through: :query_jobs
end
