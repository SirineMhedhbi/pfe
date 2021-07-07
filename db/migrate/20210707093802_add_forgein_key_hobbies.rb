class AddForgeinKeyHobbies < ActiveRecord::Migration[6.1]
  def change
    add_column :hobbies, :cv_id, :integer  
    add_foreign_key :hobbies, :cvs, column: :cv_id
  end
end
