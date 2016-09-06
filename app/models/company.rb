class Company < ApplicationRecord
  has_many :countries
  has_many :states, through: :countries
  has_many :cities, through: :states
  has_many :jobs, inverse_of: :company
end
