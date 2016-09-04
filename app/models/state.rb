class State < ApplicationRecord
  belongs_to :country
  has_many :cities
  has_many :companies, through: :cities
  has_many :jobs, through: :companies
end
