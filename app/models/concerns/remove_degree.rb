module RemoveDegree
	ACCEPT = [/High School Diploma/i,
		/GED certification/i,
		/High school or equivalent/i
	]
	REJECT = [/Bachelor's/,
		/Master's Degree/i,
		/Bachelors degree/i,
		/Required education:\W*? Associate/i,
		/Required education:\W*? Bachelor’s/i,
		/Required education:\W*? Bachelor/i,
		/Required education:\W*? Associate's/i,
		/degree/i,
		/graduating/i]
	MAYBE = [/Bachelor’s degree preferred/i,
		/Degree .* preferably/i,
		/equivalent experience/i]

	
	def remove_degrees_indeed(json)
		no_degree_jobs = json["results"].select.each_with_index do |result,index|
			job_page = Nokogiri::HTML(open(result["url"]))
			job_summary = job_page.css("#job_summary").text
			if(RemoveDegree.no_degree_indeed?(job_summary))
				result["job_summary"] = job_summary
			end
		end
	end

	# Takes a string
	# This is true if you don't need a degree for the job
	def no_degree_required_indeed?(job_summary)
		ACCEPT.each do |pattern|
			return true if(job_summary =~ pattern)
		end
		# Should integrate maybe sometime

		REJECT.each do |pattern|
			return false if (job_summary =~ pattern)
		end
		# If it gets this far return true and accept
		return true
	end




end