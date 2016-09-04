class Company < ApplicationRecord
  has_many :states
  has_many :cities
  has_many :countries
  has_many :jobs
end
