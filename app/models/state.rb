class State < ApplicationRecord
  belongs_to :country, inverse_of: :state
  has_many :cities
  has_many :companies, through: :cities
  has_many :jobs, through: :companies
end
