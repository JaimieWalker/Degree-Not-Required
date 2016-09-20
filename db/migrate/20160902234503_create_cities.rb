class CreateCities < ActiveRecord::Migration[5.0]
  def change
    create_table :cities do |t|
      t.string :name, null: false
      t.integer :state_id, foreign_key: true, index: true
      t.string :api
      t.timestamps
    end
  end
end
