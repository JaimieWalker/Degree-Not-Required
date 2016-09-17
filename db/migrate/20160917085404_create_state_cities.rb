class CreateStateCities < ActiveRecord::Migration[5.0]
  def change
    create_table :state_cities do |t|
      t.state :references
      t.city :references

      t.timestamps
    end
  end
end
