class CreateStates < ActiveRecord::Migration[5.0]
  def change
    create_table :states do |t|
      t.string :name, null: false, :unique => true
      t.references :country
      t.string :api    
      t.timestamps
    end
  end
end
