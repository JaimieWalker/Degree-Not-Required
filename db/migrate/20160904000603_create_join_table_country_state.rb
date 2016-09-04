class CreateJoinTableCountryState < ActiveRecord::Migration[5.0]
  def change
    create_join_table :countries, :states do |t|
      # t.index [:country_id, :state_id]
      # t.index [:state_id, :country_id]
    end
  end
end
