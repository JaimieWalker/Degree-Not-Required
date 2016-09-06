class CreateQueries < ActiveRecord::Migration[5.0]
  def change
    create_table :queries do |t|
      t.string :text
      
      t.timestamps
    end
  end
end
