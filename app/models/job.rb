class Job < ApplicationRecord
  belongs_to :company
  has_many :queries
end
