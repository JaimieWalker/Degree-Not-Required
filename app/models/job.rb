class Job < ApplicationRecord
  belongs_to :company
  has_many :company_jobs
  has_many :job_queries
  has_many :queries, through: :job_queries
  # to create a job
  def self.create_job(json,company)
	  	return job_object = find_or_create_by(jobkey: json["jobkey"]) do |j|
	  		j.jobtitle = json["jobtitle"]
	  		j.formattedLocation = json["formattedLocation"]
	  		j.source = json["source"]
	  		j.date = json["date"]
	  		j.snippet = json["snippet"]
	  		j.url = json["url"]
	  		j.onmousedown = json["onmousedown"]
	  		j.latitude = json["latitude"]
	  		j.longitude = json["longitude"]
	  		j.sponsored = json["sponsored"]
	  		j.expired = json["expired"]
	  		j.indeedApply = json["indeedApply"]
	  		j.formattedLocationFull = json["formattedLocationFull"]
	  		j.formattedRelativeTime = json["formattedRelativeTime"]
	  		j.job_summary = json["job_summary"]
	  		j.company_id = company.id
	  	end
  end

end
