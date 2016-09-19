class CreateJobs < ActiveRecord::Migration[5.0]
  def change
    create_table :jobs do |t|
      t.string :jobtitle
      t.string :formattedLocation
      t.string :source
      t.datetime :date
      t.string :snippet
      t.string :url
      t.string :onmousedown
      t.float :latitude
      t.float :longitude
      t.string :jobkey
      t.boolean :sponsored
      t.boolean :expired
      t.boolean :indeedApply
      t.string :formattedLocationFull
      t.string :formattedRelativeTime
      t.text :job_summary
      t.integer :company_id, index: true, foreign_key: true
      t.string :api

      t.timestamps
    end
  end
end
