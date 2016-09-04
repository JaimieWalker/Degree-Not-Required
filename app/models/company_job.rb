class CompanyJob < ApplicationRecord
	belongs_to :company
	belongs_to :job
end
