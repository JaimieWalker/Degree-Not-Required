class City < ApplicationRecord
  belongs_to :state
  has_many :companies
  has_many :jobs, through: :companies
end
