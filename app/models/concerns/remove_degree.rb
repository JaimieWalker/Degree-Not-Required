module RemoveDegree
	ACCEPT = [/High School Diploma/i,
		/GED certification/i,
		/High school or equivalent/i,
		/G\.?E\.?D\.?/
	]
	REJECT = [/\bbachelor'?s\b/i,
		/bachelor'?s/i,
		/Master's Degree/i,
		/\bbachelor'?s\s*degree\b/i,
		/Required education:\W*? ?Bachelor’?s/i,
		/Required education:\W*? ?Master'?s/i,
		/Required education:\W*? ?Associate'?s/i,
		/degree/i,
		/Bachelor of Science/i,
		/graduating/i,
		/graduates/i,
		/\b(BS)?\/?(MS)? ?(in) ?\b/i,
		/B.S./,
		/M.S./,
		/BA/,
		/Ph.D./,
		/P\.?H\.?D\.?/,
		
	]
		
	MAYBE = [/Bachelor’s degree preferred/i,
		/equivalent experience/i,
		/relevant life experience/i]

	
	def remove_degrees_from_indeed(json)
		return json["results"].select.each_with_index do |result,index|
			job_page = Nokogiri::HTML(open(result["url"]),nil,Encoding::UTF_8.to_s)
			job_summary = job_page.css("#job_summary")
			if(no_degree_required_indeed?(job_summary.text))
				result["job_summary"] = job_summary.to_html
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
		MAYBE.each do |pattern|
			return true if (job_summary =~ pattern)
		end

		REJECT.each do |pattern|
			return false if (job_summary =~ pattern)
		end
		# If it gets this far return true and accept
		return true
	end
end