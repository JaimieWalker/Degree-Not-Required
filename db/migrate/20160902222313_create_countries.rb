class CreateCountries < ActiveRecord::Migration[5.0]
  def change
    create_table :countries do |t|
      t.string :name , :unique => true
      t.string :api
      
      t.timestamps
    end
  end
end
