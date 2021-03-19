class AddForeignKeyToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :cv_id, :integer  
    add_foreign_key :users, :cvs, column: :cv_id
  end
end
