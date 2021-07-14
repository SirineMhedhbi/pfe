class CreateTestAttempts < ActiveRecord::Migration[6.1]
  def change
    create_table :test_attempts do |t|
      t.integer :name
      t.timestamps
    end
    add_column :test_attempts, :offer_test_id, :integer  
    add_foreign_key :test_attempts, :offer_tests, column: :offer_test_id
    add_column :test_attempts, :user_id, :integer  
    add_foreign_key :test_attempts, :users, column: :user_id

  end
end
