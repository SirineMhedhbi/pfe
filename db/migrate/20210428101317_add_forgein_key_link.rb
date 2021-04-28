class AddForgeinKeyLink < ActiveRecord::Migration[6.1]
  def change
    add_column :links, :cv_id, :integer  
    add_foreign_key :links, :cvs, column: :cv_id
  end
end
