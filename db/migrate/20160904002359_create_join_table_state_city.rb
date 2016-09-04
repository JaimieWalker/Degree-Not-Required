class CreateJoinTableStateCity < ActiveRecord::Migration[5.0]
  def change
    create_join_table :states, :cities do |t|
      # t.index [:state_id, :city_id]
      # t.index [:city_id, :state_id]
    end
  end
end
