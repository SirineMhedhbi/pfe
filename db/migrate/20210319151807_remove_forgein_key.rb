class RemoveForgeinKey < ActiveRecord::Migration[6.1]
  def change
    add_column :cvs, :user_id, :integer  
    add_foreign_key :cvs, :users, column: :user_id  
  end
end
