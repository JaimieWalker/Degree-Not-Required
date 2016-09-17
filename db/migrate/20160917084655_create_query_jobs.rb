class CreateQueryJobs < ActiveRecord::Migration[5.0]
  def change
    create_table :query_jobs do |t|
      t.references :query, foreign_key: true
      t.references :jobs, foreign_key: true
      t.timestamps
    end
  end
end
