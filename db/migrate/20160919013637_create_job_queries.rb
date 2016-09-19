class CreateJobQueries < ActiveRecord::Migration[5.0]
  def change
    create_table :job_queries do |t|
      t.references :job
      t.references :query
      t.timestamps
    end
  end
end
