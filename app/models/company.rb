class Company < ApplicationRecord
  belongs_to :state
  belongs_to :city
  belongs_to :country
end
