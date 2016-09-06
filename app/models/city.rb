class City < ApplicationRecord
  belongs_to :state, inverse_of: :city
  has_many :companies
  has_many :jobs, through: :companies
end
