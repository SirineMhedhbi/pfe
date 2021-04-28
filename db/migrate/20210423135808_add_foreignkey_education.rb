class AddForeignkeyEducation < ActiveRecord::Migration[6.1]
  def change
    add_column :educations, :cv_id, :integer  
    add_foreign_key :educations, :cvs, column: :cv_id
  end
end
