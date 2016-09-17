class CreateJoinTableQueryJob < ActiveRecord::Migration[5.0]
  def change
    create_join_table :queries, :jobs do |t|
      t.index [:query_id, :job_id]
      t.index [:job_id, :query_id]
    end
  end
end
