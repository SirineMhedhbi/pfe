class AddForeignKeyToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :company_id, :integer  
    add_foreign_key :users, :companies, column: :company_id
  end
end
