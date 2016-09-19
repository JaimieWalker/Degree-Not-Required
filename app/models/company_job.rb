class CompanyJob < ApplicationRecord
	belongs_to :company
	belongs_to :job

	self.table_name = "companies_jobs"

	def self.create_company_job_association(company,job)
		return find_or_create_by(company_id: company.id, job_id: job.id)
	end
end
